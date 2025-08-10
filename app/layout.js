import './globals.css'

export const metadata = {
    title: 'ShareBin - Instant File & Text Sharing',
    description: 'Share text and files instantly with expiring links. Built with Railway.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
