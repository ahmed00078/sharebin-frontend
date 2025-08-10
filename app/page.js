'use client';
import { useState } from 'react';
import { Upload, FileText, Clock, Copy, Check, Github, Zap } from 'lucide-react';

export default function Home() {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [expiration, setExpiration] = useState('24');
    const [loading, setLoading] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setShareUrl('');

        try {
            const formData = new FormData();

            if (file) {
                formData.append('file', file);
            } else if (text) {
                formData.append('text', text);
            } else {
                throw new Error('Please provide text or select a file');
            }

            formData.append('expiration', expiration);

            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            const fullUrl = `${window.location.origin}/v/${data.id}`;
            setShareUrl(fullUrl);

            // Clear form
            setText('');
            setFile(null);
            document.getElementById('file-input').value = '';
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-railway-gradient">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-railway-500/10 border border-railway-500/20">
                            <Zap className="w-8 h-8 text-railway-400" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-railway-200 bg-clip-text text-transparent">
                            ShareBin
                        </h1>
                    </div>
                    <p className="text-xl text-gray-300 mb-2">Share text & files instantly with expiring links</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-railway-300">
                        <span>Built with</span>
                        <span className="text-railway-400">♦</span>
                        <span>on Railway</span>
                    </div>
                </div>

                {/* Main Form */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-railway-card backdrop-blur-lg rounded-2xl shadow-railway-lg p-8 border border-white/10 hover:border-railway-500/30 transition-colors duration-300">
                        <form onSubmit={handleSubmit}>
                            {/* Text Input */}
                            <div className="mb-6">
                                <label className="flex items-center gap-2 text-white mb-2">
                                    <FileText className="w-5 h-5" />
                                    Paste your text
                                </label>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Enter your text here..."
                                    className="w-full h-40 px-4 py-3 bg-dark-200 border border-dark-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-railway-500 focus:ring-1 focus:ring-railway-500 transition-colors"
                                    disabled={file !== null}
                                />
                            </div>

                            {/* OR Divider */}
                            <div className="flex items-center my-6">
                                <div className="flex-1 h-px bg-dark-400"></div>
                                <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
                                <div className="flex-1 h-px bg-dark-400"></div>
                            </div>

                            {/* File Upload */}
                            <div className="mb-6">
                                <label className="flex items-center gap-2 text-white mb-2">
                                    <Upload className="w-5 h-5" />
                                    Upload a file
                                </label>
                                <input
                                    id="file-input"
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="w-full px-4 py-3 bg-dark-200 border border-dark-400 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-railway-500 file:text-white hover:file:bg-railway-600 cursor-pointer focus:outline-none focus:border-railway-500 focus:ring-1 focus:ring-railway-500 transition-colors"
                                    disabled={text !== ''}
                                />
                                {file && (
                                    <p className="mt-2 text-sm text-gray-300">
                                        Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                    </p>
                                )}
                            </div>

                            {/* Expiration */}
                            <div className="mb-6">
                                <label className="flex items-center gap-2 text-white mb-2">
                                    <Clock className="w-5 h-5" />
                                    Expiration
                                </label>
                                <select
                                    value={expiration}
                                    onChange={(e) => setExpiration(e.target.value)}
                                    className="w-full px-4 py-3 bg-dark-200 border border-dark-400 rounded-lg text-white focus:outline-none focus:border-railway-500 focus:ring-1 focus:ring-railway-500 transition-colors"
                                >
                                    <option value="1">1 hour</option>
                                    <option value="6">6 hours</option>
                                    <option value="24">24 hours</option>
                                    <option value="168">1 week</option>
                                    <option value="0">Never</option>
                                </select>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || (!text && !file)}
                                className="w-full py-3 px-6 bg-gradient-to-r from-railway-600 to-railway-700 text-white font-semibold rounded-lg hover:from-railway-700 hover:to-railway-800 focus:outline-none focus:ring-2 focus:ring-railway-500 focus:ring-offset-2 focus:ring-offset-dark-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-railway"
                            >
                                {loading ? 'Creating share...' : 'Create Share Link'}
                            </button>
                        </form>

                        {/* Success Result */}
                        {shareUrl && (
                            <div className="mt-6 p-4 bg-railway-500/10 border border-railway-500/30 rounded-lg">
                                <p className="text-railway-200 mb-2 font-medium">Share created successfully!</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={shareUrl}
                                        readOnly
                                        className="flex-1 px-3 py-2 bg-dark-200 border border-dark-400 rounded text-white focus:outline-none focus:border-railway-500"
                                    />
                                    <button
                                        onClick={copyToClipboard}
                                        className="px-4 py-2 bg-railway-500 text-white rounded hover:bg-railway-600 transition-colors flex items-center gap-2"
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Features */}
                <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
                    <div className="bg-railway-card backdrop-blur rounded-xl p-6 border border-white/10 hover:border-railway-500/30 transition-colors group">
                        <div className="w-12 h-12 bg-railway-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-railway-500/30 transition-colors">
                            <Zap className="w-6 h-6 text-railway-400 group-hover:text-railway-300 transition-colors" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
                        <p className="text-gray-400 text-sm">Instant sharing with auto-generated short links</p>
                    </div>
                    <div className="bg-railway-card backdrop-blur rounded-xl p-6 border border-white/10 hover:border-railway-500/30 transition-colors group">
                        <div className="w-12 h-12 bg-railway-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-railway-600/30 transition-colors">
                            <Clock className="w-6 h-6 text-railway-300 group-hover:text-railway-200 transition-colors" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Auto-Expiring</h3>
                        <p className="text-gray-400 text-sm">Set expiration times for automatic cleanup</p>
                    </div>
                    <div className="bg-railway-card backdrop-blur rounded-xl p-6 border border-white/10 hover:border-railway-500/30 transition-colors group">
                        <div className="w-12 h-12 bg-railway-700/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-railway-700/30 transition-colors">
                            <Github className="w-6 h-6 text-railway-400 group-hover:text-railway-300 transition-colors" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Open Source</h3>
                        <p className="text-gray-400 text-sm">Deploy your own instance with one click on Railway</p>
                    </div>
                </div>
            </div>
        </div>
    );
}