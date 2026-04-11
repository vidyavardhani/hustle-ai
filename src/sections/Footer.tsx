import { Github, Twitter, Linkedin, Youtube, Mail } from 'lucide-react';

const footerLinks = {
  program: ['Curriculum', 'Tiers', 'Lab', 'Career Support'],
  company: ['About Us', 'Blog', 'Press Kit', 'Contact'],
  legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const Footer = () => {
  return (
    <footer className="relative w-full bg-black py-12 sm:py-16 lg:py-20 border-t border-white/5">
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Main content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 tracking-tight">Learn By Earning</div>
            <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-5 max-w-xs">
              Empowering the next generation of AI builders. Learn to create, deploy, and scale generative AI applications.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={social.label} 
                    href={social.href} 
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white hover:text-black transition-all duration-300" 
                    aria-label={social.label}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-[10px] sm:text-xs text-white/40 font-mono tracking-wider mb-2 sm:mb-3">PROGRAM</div>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.program.map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] sm:text-xs text-white/40 font-mono tracking-wider mb-2 sm:mb-3">COMPANY</div>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] sm:text-xs text-white/40 font-mono tracking-wider mb-2 sm:mb-3">LEGAL</div>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-sm sm:text-base font-medium text-white mb-1">Stay updated</div>
              <p className="text-xs sm:text-sm text-white/50">Get the latest news on AI and our programs.</p>
            </div>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white text-xs sm:text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 w-40 sm:w-52" 
              />
              <button className="px-3 sm:px-4 py-2 bg-white text-black rounded-full text-xs sm:text-sm font-medium hover:bg-white/90 transition-colors flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-white/5">
          <div className="text-[10px] sm:text-xs text-white/30">
            &copy; 2025 Learn By Earning Academy. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] sm:text-xs text-white/30">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
