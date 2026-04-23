'use client';

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: '#',
      icon: FaGithub,
    },
    {
      name: 'LinkedIn',
      url: '#',
      icon: FaLinkedin,
    },
    {
      name: 'Email',
      url: 'mailto:sabin.nakarmi@example.com',
      icon: FaEnvelope,
    },
  ];

  const navLinks = [
    { name: 'About', url: '#about' },
    { name: 'Experience', url: '#experience' },
    { name: 'Projects', url: '#projects' },
    { name: 'Skills', url: '#skills' },
    { name: 'Contact', url: '#contact' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-space-grotesk text-lg font-bold text-foreground mb-2">
              Sabin Nakarmi
            </h3>
            <p className="text-sm text-muted-foreground">
              Senior Flutter Developer & Technical Team Lead. Building scalable mobile solutions and leading high-performance teams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-space-grotesk text-sm font-bold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-space-grotesk text-sm font-bold text-foreground mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors duration-200"
                    title={social.name}
                  >
                    <Icon className="text-lg" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8"></div>

        {/* Bottom Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Sabin Nakarmi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
