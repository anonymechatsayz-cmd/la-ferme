import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Extraire FAQ
const faqStart = content.indexOf('{/* 8. FAQ SECTION */}');
const faqEnd = content.indexOf('{/* 9. TESTIMONIALS SECTION */}');
const faqSection = content.substring(faqStart, faqEnd);

// 2. Extraire Testimonials
const testStart = faqEnd;
const testEnd = content.indexOf('{/* 10. CONTACT & INFORMATIONS PRATIQUES */}');
const testSection = content.substring(testStart, testEnd);

// 3. Modifier la numérotation
const newTestSection = testSection.replace('9. TESTIMONIALS', '8. TESTIMONIALS');
const newFaqSection = faqSection.replace('8. FAQ', '9. FAQ');

// 4. Concaténer
const newContent = content.substring(0, faqStart) + newTestSection + newFaqSection + content.substring(testEnd);

fs.writeFileSync('src/App.tsx', newContent, 'utf-8');
