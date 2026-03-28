const fs = require('fs');
const path = require('path');

const indexContent = fs.readFileSync('index.html', 'utf8');

// The tricky part: extracting nav and footer.
// nav: from `<!-- TOPBAR -->` up to `</nav>` wrapper end... wait index.html has a hero section.
// Let's grab everything up to the end of `<nav class="navbar text-white">`
const navMatch = indexContent.match(/^[\s\S]*?<\/nav>/i);
const headerHtml = navMatch ? navMatch[0] : indexContent.substring(0, 2000);

// The footer: from `<!-- FOOTER -->` to the end.
const footerMatch = indexContent.match(/<!-- FOOTER -->[\s\S]*$/i);
const footerHtml = footerMatch ? footerMatch[0] : indexContent.substring(indexContent.length - 2000);

// For templating, I'll rewrite the nav header so that the links resolve correctly (this is single level so simple)
const fixedHeader = headerHtml.replace(/href="#(about|services|philosophy|contact)"/g, 'href="index.html#$1"');

const pages = [
  // Services
  { file: 'service-assisted-living.html', title: 'Assisted Living', pre: 'Our Services' },
  { file: 'service-memory-care.html', title: 'Memory Care', pre: 'Our Services' },
  { file: 'service-home-nursing.html', title: 'Home Nursing', pre: 'Our Services' },
  { file: 'service-day-care.html', title: 'Day Care Program', pre: 'Our Services' },
  { file: 'service-medical-care.html', title: 'Medical & Geriatric Care', pre: 'Our Services' },
  { file: 'service-wellness.html', title: 'Wellness Programs', pre: 'Our Services' },

  // Quick Links
  { file: 'about.html', title: 'About Us', pre: 'Quick Links' },
  { file: 'team.html', title: 'Our Team', pre: 'Quick Links' },
  { file: 'facilities.html', title: 'Facilities & Accommodations', pre: 'Quick Links' },
  { file: 'careers.html', title: 'Careers', pre: 'Quick Links' },
  { file: 'blog.html', title: 'Blog & Resources', pre: 'Quick Links' },
  { file: 'contact.html', title: 'Contact Support', pre: 'Quick Links' }
];

pages.forEach(p => {
    const bodyTemplate = `
<section style="min-height: 45vh; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(rgba(15,23,42,0.8), rgba(69,105,52,0.8)), url('https://images.unsplash.com/photo-1576766125468-a5d48274c5b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80') center/cover;">
    <div class="container" style="padding-top: 5rem;">
        <span class="badge" style="background: rgba(255,255,255,0.2); color: white; margin-bottom: 1rem; backdrop-filter: blur(5px); border: 1px solid rgba(255,255,255,0.3); border-radius: 20px; padding: 0.5rem 1rem;">${p.pre}</span>
        <h1 style="color: white; font-size: 3.5rem; margin-bottom: 1rem; text-shadow: 0 4px 12px rgba(0,0,0,0.3);">${p.title}</h1>
        <p style="color: #e0f2fe; max-width: 600px; margin: 0 auto; font-size: 1.1rem;">Explore our specialized approach and comprehensive guidelines crafted to support the Tranquil Retreat philosophy.</p>
    </div>
</section>

<section class="container" style="padding: 5rem 1rem;">
    <div class="card mx-auto text-center" style="max-width: 800px; padding: 4rem; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid var(--border);">
        <i class="ph ph-hammer text-primary" style="font-size: 4rem; margin-bottom: 1rem;"></i>
        <h2 style="font-size: 2rem; margin-bottom: 1rem;">Page Under Construction</h2>
        <p class="text-muted" style="font-size: 1.1rem; margin-bottom: 2rem;">The detailed content for <strong>${p.title}</strong> is currently being finalized by our editorial team. Please check back shortly for updates.</p>
        <a href="index.html" class="btn btn-primary" style="padding: 0.8rem 2rem; border-radius: 30px;"><i class="ph ph-arrow-left"></i> Return Home</a>
    </div>
</section>

<script src="js/app.js"></script>
    `;

    const html = `${fixedHeader}
${bodyTemplate}
${footerHtml}`;

    fs.writeFileSync(p.file, html);
    console.log('Created: ' + p.file);
});
