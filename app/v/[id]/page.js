'use client';
import { useState, useEffect } from 'react';
import { Download, FileText, Copy, Check, Home, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ViewShare() {
    const params = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    useEffect(() => {
        fetchShare();
    }, [params.id]);

    const fetchShare = async () => {
        try {
            const response = await fetch(`${API_URL}/v/${params.id}`);
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Share not found');
            }
            const shareData = await response.json();
            setData(shareData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const copyText = () => {
        if (data && data.type === 'text') {
            navigator.clipboard.writeText(data.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const downloadFile = () => {
        if (data && data.type === 'file') {
            const byteCharacters = atob(data.data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: data.mimetype });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = data.filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
    };

    const formatExpiration = (expiresAt) => {
        if (!expiresAt) return 'Never';
        const date = new Date(expiresAt);
        const now = new Date();
        const diff = date - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
        return 'Soon';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading share...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-400 text-2xl mb-4">{error}</div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">ShareBin</h1>
                    <div className="flex justify-center gap-6 text-sm text-gray-300">
                        <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {data.views} view{data.views !== 1 ? 's' : ''}
                        </span>
                        {data.expiresAt && (
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                Expires in {formatExpiration(data.expiresAt)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                        {data.type === 'text' ? (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2 text-white">
                                        <FileText className="w-5 h-5" />
                                        <span className="font-semibold">Shared Text</span>
                                    </div>
                                    <button
                                        onClick={copyText}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                                <div className="bg-black/30 rounded-lg p-6 overflow-auto max-h-96">
                                    <pre className="text-gray-100 whitespace-pre-wrap font-mono text-sm">
                                        {data.content}
                                    </pre>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2 text-white">
                                        <Download className="w-5 h-5" />
                                        <span className="font-semibold">Shared File</span>
                                    </div>
                                </div>
                                <div className="bg-black/30 rounded-lg p-8 text-center">
                                    <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Download className="w-10 h-10 text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{data.filename}</h3>
                                    <p className="text-gray-400 mb-6">Type: {data.mimetype}</p>
                                    <button
                                        onClick={downloadFile}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition"
                                    >
                                        <Download className="w-5 h-5" />
                                        Download File
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="text-center mt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur text-white rounded-lg hover:bg-white/20 transition border border-white/20"
                        >
                            <Home className="w-5 h-5" />
                            Create New Share
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}