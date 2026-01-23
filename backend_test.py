#!/usr/bin/env python3
"""
Backend API Testing Suite for Bikramjit Singh's Portfolio Website
Tests all backend endpoints for functionality, validation, and error handling
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any

# Backend URL from frontend environment
BACKEND_URL = "https://bikramjit-ds.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.test_results = []
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    
    def log_test(self, test_name: str, success: bool, details: str, response_data: Any = None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'details': details,
            'timestamp': datetime.now().isoformat(),
            'response_data': response_data
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        if not success and response_data:
            print(f"   Response: {response_data}")
    
    def test_portfolio_endpoint(self):
        """Test GET /api/portfolio endpoint"""
        print("\n🔍 Testing Portfolio Endpoint...")
        
        try:
            response = self.session.get(f"{BACKEND_URL}/portfolio")
            
            if response.status_code == 200:
                data = response.json()
                
                # Validate required fields
                required_fields = ['personal', 'about', 'skills', 'experience', 'projects', 'education']
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test(
                        "Portfolio Data Structure", 
                        False, 
                        f"Missing required fields: {missing_fields}",
                        data
                    )
                    return False
                
                # Validate personal info
                personal = data.get('personal', {})
                personal_required = ['name', 'title', 'email', 'phone', 'github', 'linkedin']
                missing_personal = [field for field in personal_required if field not in personal]
                
                if missing_personal:
                    self.log_test(
                        "Personal Info Validation", 
                        False, 
                        f"Missing personal fields: {missing_personal}",
                        personal
                    )
                else:
                    self.log_test(
                        "Personal Info Validation", 
                        True, 
                        f"All personal fields present. Name: {personal.get('name')}"
                    )
                
                # Validate skills structure
                skills = data.get('skills', {})
                skills_required = ['programming', 'software', 'techniques']
                missing_skills = [field for field in skills_required if field not in skills]
                
                if missing_skills:
                    self.log_test(
                        "Skills Structure Validation", 
                        False, 
                        f"Missing skills categories: {missing_skills}",
                        skills
                    )
                else:
                    prog_count = len(skills.get('programming', []))
                    soft_count = len(skills.get('software', []))
                    tech_count = len(skills.get('techniques', []))
                    self.log_test(
                        "Skills Structure Validation", 
                        True, 
                        f"Skills loaded: {prog_count} programming, {soft_count} software, {tech_count} techniques"
                    )
                
                # Validate experience
                experience = data.get('experience', [])
                if len(experience) >= 3:
                    self.log_test(
                        "Experience Data Validation", 
                        True, 
                        f"Found {len(experience)} experience entries"
                    )
                else:
                    self.log_test(
                        "Experience Data Validation", 
                        False, 
                        f"Expected at least 3 experience entries, found {len(experience)}",
                        experience
                    )
                
                # Validate projects
                projects = data.get('projects', [])
                if len(projects) >= 6:
                    self.log_test(
                        "Projects Data Validation", 
                        True, 
                        f"Found {len(projects)} project entries"
                    )
                else:
                    self.log_test(
                        "Projects Data Validation", 
                        False, 
                        f"Expected at least 6 project entries, found {len(projects)}",
                        projects
                    )
                
                # Validate education
                education = data.get('education', {})
                edu_required = ['degree', 'school', 'location', 'period']
                missing_edu = [field for field in edu_required if field not in education]
                
                if missing_edu:
                    self.log_test(
                        "Education Data Validation", 
                        False, 
                        f"Missing education fields: {missing_edu}",
                        education
                    )
                else:
                    self.log_test(
                        "Education Data Validation", 
                        True, 
                        f"Education complete: {education.get('degree')} at {education.get('school')}"
                    )
                
                self.log_test(
                    "Portfolio Endpoint", 
                    True, 
                    "Portfolio data retrieved successfully with all required sections"
                )
                return True
                
            else:
                self.log_test(
                    "Portfolio Endpoint", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}",
                    response.text
                )
                return False
                
        except Exception as e:
            self.log_test(
                "Portfolio Endpoint", 
                False, 
                f"Request failed: {str(e)}",
                str(e)
            )
            return False
    
    def test_contact_endpoint_valid(self):
        """Test POST /api/contact with valid data"""
        print("\n📧 Testing Contact Endpoint - Valid Data...")
        
        valid_data = {
            "name": "Bikramjit Test User",
            "email": "bikramjit.test@example.com",
            "message": "This is a comprehensive test message for the portfolio contact form. I am interested in discussing data analytics opportunities and would like to connect regarding potential collaboration on machine learning projects."
        }
        
        try:
            response = self.session.post(f"{BACKEND_URL}/contact", json=valid_data)
            
            if response.status_code == 200:
                data = response.json()
                
                if data.get('success') and 'message' in data and 'id' in data:
                    self.log_test(
                        "Contact Form - Valid Data", 
                        True, 
                        f"Message submitted successfully. ID: {data.get('id')}"
                    )
                    return data.get('id')  # Return ID for later verification
                else:
                    self.log_test(
                        "Contact Form - Valid Data", 
                        False, 
                        "Response missing required fields (success, message, id)",
                        data
                    )
                    return None
            else:
                self.log_test(
                    "Contact Form - Valid Data", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}",
                    response.text
                )
                return None
                
        except Exception as e:
            self.log_test(
                "Contact Form - Valid Data", 
                False, 
                f"Request failed: {str(e)}",
                str(e)
            )
            return None
    
    def test_contact_endpoint_invalid_email(self):
        """Test POST /api/contact with invalid email"""
        print("\n📧 Testing Contact Endpoint - Invalid Email...")
        
        invalid_data = {
            "name": "Test User",
            "email": "invalid-email-format",
            "message": "This should fail due to invalid email format."
        }
        
        try:
            response = self.session.post(f"{BACKEND_URL}/contact", json=invalid_data)
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test(
                    "Contact Form - Invalid Email", 
                    True, 
                    "Correctly rejected invalid email format with 422 status"
                )
                return True
            elif response.status_code == 200:
                self.log_test(
                    "Contact Form - Invalid Email", 
                    False, 
                    "Should have rejected invalid email but accepted it",
                    response.json()
                )
                return False
            else:
                self.log_test(
                    "Contact Form - Invalid Email", 
                    False, 
                    f"Unexpected status code {response.status_code}: {response.text}",
                    response.text
                )
                return False
                
        except Exception as e:
            self.log_test(
                "Contact Form - Invalid Email", 
                False, 
                f"Request failed: {str(e)}",
                str(e)
            )
            return False
    
    def test_contact_endpoint_missing_fields(self):
        """Test POST /api/contact with missing required fields"""
        print("\n📧 Testing Contact Endpoint - Missing Fields...")
        
        incomplete_data = {
            "name": "Test User",
            # Missing email and message
        }
        
        try:
            response = self.session.post(f"{BACKEND_URL}/contact", json=incomplete_data)
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test(
                    "Contact Form - Missing Fields", 
                    True, 
                    "Correctly rejected incomplete data with 422 status"
                )
                return True
            elif response.status_code == 200:
                self.log_test(
                    "Contact Form - Missing Fields", 
                    False, 
                    "Should have rejected incomplete data but accepted it",
                    response.json()
                )
                return False
            else:
                self.log_test(
                    "Contact Form - Missing Fields", 
                    False, 
                    f"Unexpected status code {response.status_code}: {response.text}",
                    response.text
                )
                return False
                
        except Exception as e:
            self.log_test(
                "Contact Form - Missing Fields", 
                False, 
                f"Request failed: {str(e)}",
                str(e)
            )
            return False
    
    def test_contact_messages_endpoint(self):
        """Test GET /api/contact/messages endpoint"""
        print("\n📬 Testing Contact Messages Endpoint...")
        
        try:
            response = self.session.get(f"{BACKEND_URL}/contact/messages")
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    message_count = len(data)
                    
                    # Check if our test message is in the list
                    test_message_found = False
                    for message in data:
                        if (message.get('email') == 'bikramjit.test@example.com' and 
                            'comprehensive test message' in message.get('message', '').lower()):
                            test_message_found = True
                            break
                    
                    if test_message_found:
                        self.log_test(
                            "Contact Messages Retrieval", 
                            True, 
                            f"Retrieved {message_count} messages, including our test message"
                        )
                    else:
                        self.log_test(
                            "Contact Messages Retrieval", 
                            True, 
                            f"Retrieved {message_count} messages (test message may not be persisted)"
                        )
                    
                    # Validate message structure if messages exist
                    if message_count > 0:
                        sample_message = data[0]
                        required_fields = ['name', 'email', 'message', 'created_at']
                        missing_fields = [field for field in required_fields if field not in sample_message]
                        
                        if missing_fields:
                            self.log_test(
                                "Message Structure Validation", 
                                False, 
                                f"Messages missing required fields: {missing_fields}",
                                sample_message
                            )
                        else:
                            self.log_test(
                                "Message Structure Validation", 
                                True, 
                                "Message structure contains all required fields"
                            )
                    
                    return True
                else:
                    self.log_test(
                        "Contact Messages Retrieval", 
                        False, 
                        "Response is not a list",
                        data
                    )
                    return False
            else:
                self.log_test(
                    "Contact Messages Retrieval", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}",
                    response.text
                )
                return False
                
        except Exception as e:
            self.log_test(
                "Contact Messages Retrieval", 
                False, 
                f"Request failed: {str(e)}",
                str(e)
            )
            return False
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print("🚀 Starting Backend API Tests for Bikramjit Singh's Portfolio")
        print(f"🌐 Testing against: {BACKEND_URL}")
        print("=" * 60)
        
        # Test portfolio endpoint
        portfolio_success = self.test_portfolio_endpoint()
        
        # Test contact form with valid data
        contact_id = self.test_contact_endpoint_valid()
        
        # Test contact form validation
        invalid_email_success = self.test_contact_endpoint_invalid_email()
        missing_fields_success = self.test_contact_endpoint_missing_fields()
        
        # Test contact messages retrieval
        messages_success = self.test_contact_messages_endpoint()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['test']}: {result['details']}")
        
        print("\n🎯 CRITICAL FUNCTIONALITY STATUS:")
        print(f"  Portfolio Data Retrieval: {'✅ Working' if portfolio_success else '❌ Failed'}")
        print(f"  Contact Form Submission: {'✅ Working' if contact_id else '❌ Failed'}")
        print(f"  Contact Form Validation: {'✅ Working' if invalid_email_success and missing_fields_success else '❌ Failed'}")
        print(f"  Message Retrieval: {'✅ Working' if messages_success else '❌ Failed'}")
        
        return failed_tests == 0


def main():
    """Main test execution"""
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(tester.test_results, f, indent=2, default=str)
    
    print(f"\n📄 Detailed results saved to: /app/backend_test_results.json")
    
    if success:
        print("\n🎉 All backend tests passed successfully!")
        sys.exit(0)
    else:
        print("\n⚠️  Some backend tests failed. Check the details above.")
        sys.exit(1)


if __name__ == "__main__":
    main()