import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Palette, Presentation, Layout, ExternalLink, Brush, PieChart } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const Storytelling = ({ storytelling }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    // If no data is available
    if (!storytelling) return null;

    const icons = [
        <Presentation className="w-5 h-5" />,
        <PieChart className="w-5 h-5" />,
        <Layout className="w-5 h-5" />,
        <Brush className="w-5 h-5" />
    ];

    return (
        <section id="design" className="py-24 relative bg-transparent" ref={ref}>
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="max-w-7xl mx-auto"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-16 text-center">
                        <span className="text-pink-500 font-mono text-sm mb-2 block">// section_design</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Design<span className="text-pink-400">.portfolio</span>
                        </h2>
                        <div className="h-1 w-20 bg-pink-500 mx-auto rounded-full"></div>
                        <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
                            {storytelling.description}
                        </p>
                    </motion.div>

                    {/* Content Card */}
                    <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
                        <Card className="bg-slate-900/80 border-pink-500/30 p-8 shadow-lg shadow-pink-900/20 backdrop-blur-sm transition-all duration-300 hover:border-pink-500/50 relative overflow-hidden group">
                            {/* Decorative background flair */}
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-colors duration-500 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors duration-500 pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col items-center gap-10">
                                {/* Visual/Image Side - Centered Above text */}
                                <div className="w-full md:w-4/5 lg:w-3/4 flex justify-center">
                                    <div className="relative group/img w-full max-w-3xl">
                                        <div className="absolute inset-0 bg-pink-500/10 rounded-xl blur-xl animate-pulse group-hover/img:bg-pink-500/20 transition-colors duration-500"></div>
                                        <div className="relative z-10 rounded-xl overflow-hidden border border-pink-500/20 shadow-2xl flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
                                            {storytelling.image ? (
                                                <img
                                                    src={storytelling.image}
                                                    alt="Design Portfolio Cover"
                                                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover/img:scale-105"
                                                />
                                            ) : (
                                                <div className="p-16">
                                                    <Palette className="w-24 h-24 text-pink-400 opacity-60" strokeWidth={1} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Text/Details Side - Centered Below Image */}
                                <div className="w-full md:w-5/6 lg:w-4/5 flex flex-col items-center text-center px-4">
                                    <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-pink-400 transition-colors">
                                        {storytelling.title}
                                    </h3>

                                    <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
                                        Blending analytical rigor with visual design principles, I craft dashboards, campaign visuals, and insight presentations that make complex information <strong className="text-pink-400">accessible, persuasive, and actionable</strong>.
                                    </p>

                                    {/* Capabilities pills */}
                                    <div className="flex flex-wrap gap-4 justify-center mb-10 w-full max-w-3xl">
                                        {storytelling.skills.map((skill, index) => (
                                            <Badge key={index} className="bg-pink-950/40 text-pink-300 border-pink-500/30 px-4 py-2 text-sm flex items-center gap-2 cursor-default hover:bg-pink-900/60 transition-colors">
                                                {icons[index % icons.length]}
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Explore Button Section */}
                                    <div className="flex flex-col gap-5 w-full items-center mt-2 border-t border-slate-800/80 pt-8">
                                        <p className="text-pink-300/80 font-medium italic text-lg">
                                            "Discover how I turn data into strategy, and insights into design..."
                                        </p>
                                        <Button
                                            className="bg-pink-600 hover:bg-pink-500 text-white font-mono text-base px-10 py-7 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all group/btn flex items-center justify-center gap-3 w-full sm:w-auto"
                                            onClick={() => window.open(storytelling.link, '_blank')}
                                        >
                                            <Brush className="w-5 h-5 group-hover/btn:-rotate-12 transition-transform" />
                                            EXPLORE_MY_PORTFOLIO()
                                            <ExternalLink className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Storytelling;
