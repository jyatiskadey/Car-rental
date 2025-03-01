function Footer() {
    return (
        <footer className="bg-gray-900 text-white text-center py-6">
            <p className="mb-2">&copy; {new Date().getFullYear()} EliteDrive. All Rights Reserved.</p>
            <div className="space-x-4">
                <a href="/" className="text-gray-400 hover:text-white">Privacy Policy</a>
                <a href="/" className="text-gray-400 hover:text-white">Terms of Service</a>
            </div>
        </footer>
    );
}

export default Footer;
