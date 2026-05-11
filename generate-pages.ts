import fs from 'fs';
import path from 'path';

const pages = [
  'app/(public)/page.tsx',
  'app/(public)/tests/page.tsx',
  'app/(public)/tests/[category]/page.tsx',
  'app/(public)/tests/[category]/[testId]/start/page.tsx',
  'app/(public)/tests/[category]/[testId]/attempt/page.tsx',
  'app/(public)/tests/[category]/[testId]/results/[id]/page.tsx',
  'app/(public)/pricing/page.tsx',
  'app/(public)/about/page.tsx',
  'app/(public)/faq/page.tsx',
  'app/(public)/auth/login/page.tsx',
  'app/(public)/auth/signup/page.tsx',
  'app/(public)/auth/org-signup/page.tsx',
  'app/(public)/auth/forgot-password/page.tsx',
  'app/(public)/auth/reset-password/[token]/page.tsx',
  'app/(public)/invite/[token]/page.tsx',
  'app/(public)/403/page.tsx',
  'app/(public)/404/page.tsx',
  'app/(public)/maintenance/page.tsx',
  'app/(individual)/dashboard/page.tsx',
  'app/(individual)/dashboard/tests/page.tsx',
  'app/(individual)/dashboard/progress/page.tsx',
  'app/(individual)/dashboard/leaderboard/page.tsx',
  'app/(individual)/dashboard/challenges/page.tsx',
  'app/(individual)/dashboard/profile/page.tsx',
  'app/(org)/org/[slug]/page.tsx',
  'app/(org)/org/[slug]/campaigns/page.tsx',
  'app/(org)/org/[slug]/campaigns/new/page.tsx',
  'app/(org)/org/[slug]/campaigns/[id]/page.tsx',
  'app/(org)/org/[slug]/results/page.tsx',
  'app/(org)/org/[slug]/members/page.tsx',
  'app/(org)/org/[slug]/reports/page.tsx',
  'app/(org)/org/[slug]/settings/page.tsx',
  'app/(admin)/admin/page.tsx',
  'app/(admin)/admin/questions/page.tsx',
  'app/(admin)/admin/tests/page.tsx',
  'app/(admin)/admin/users/page.tsx',
  'app/(admin)/admin/events/page.tsx',
  'app/(admin)/admin/reports/page.tsx',
  'app/(superadmin)/superadmin/page.tsx',
  'app/(superadmin)/superadmin/organizations/page.tsx',
  'app/(superadmin)/superadmin/organizations/[id]/page.tsx',
  'app/(superadmin)/superadmin/admins/page.tsx',
  'app/(superadmin)/superadmin/settings/page.tsx',
  'app/(superadmin)/superadmin/billing/page.tsx',
  'app/(superadmin)/superadmin/audit/page.tsx',
];

const generateContent = (filePath: string) => {
  const isClient = filePath.includes('attempt/page.tsx');
  return `${isClient ? '"use client";\n\n' : ''}export default function Page() {
  return (
    <div>
      <h1>${filePath}</h1>
    </div>
  );
}
`;
};

pages.forEach((pagePath) => {
  const fullPath = path.join(__dirname, pagePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, generateContent(pagePath));
  }
});

// Also layout files if they don't exist
const layouts = [
  'app/(public)/layout.tsx',
  'app/(individual)/layout.tsx',
  'app/(org)/org/[slug]/layout.tsx',
  'app/(admin)/layout.tsx',
  'app/(superadmin)/layout.tsx',
];

layouts.forEach((layoutPath) => {
  const fullPath = path.join(__dirname, layoutPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, `export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`);
  }
});

console.log('Successfully generated missing pages and layouts.');
