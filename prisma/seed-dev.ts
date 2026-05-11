import { PrismaClient, GlobalRole, OrgPlan, OrgStatus, TestCategorySlug, DifficultyLevel, CampaignStatus, ParticipantStatus, OrgMemberRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed-dev...');

  // 1. Platform Settings
  await prisma.platformSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      freeTestLimit: 3,
      maintenanceMode: false,
      defaultNumericalSecs: 2400,
      defaultVerbalSecs: 1800,
      defaultAbstractSecs: 2400,
      defaultSituationalSecs: 2700,
      defaultPersonalitySecs: 1800,
      defaultEiSecs: 1800,
      defaultQuestionSecs: 120,
    },
  });
  console.log('Upserted PlatformSettings');

  // 2. Test Categories
  const categories = [
    { slug: TestCategorySlug.NUMERICAL, label: 'Numerical Reasoning', description: 'Test numerical reasoning', iconName: 'calculator', color: '#6366F1' },
    { slug: TestCategorySlug.VERBAL, label: 'Verbal Reasoning', description: 'Test verbal reasoning', iconName: 'book-open', color: '#8B5CF6' },
    { slug: TestCategorySlug.ABSTRACT, label: 'Abstract Reasoning', description: 'Test abstract reasoning', iconName: 'shapes', color: '#06B6D4' },
    { slug: TestCategorySlug.SITUATIONAL, label: 'Situational Judgment', description: 'Test situational judgment', iconName: 'users', color: '#10B981' },
    { slug: TestCategorySlug.PERSONALITY, label: 'Personality Profile', description: 'Test personality', iconName: 'user-circle', color: '#F59E0B' },
    { slug: TestCategorySlug.EMOTIONAL_INTELLIGENCE, label: 'Emotional Intelligence', description: 'Test emotional intelligence', iconName: 'heart', color: '#EF4444' },
  ];

  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.testCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categoryMap[cat.slug] = created.id;
  }
  console.log('Upserted TestCategories');

  // 3. Users
  const passwordHash = await bcrypt.hash('SuperAdmin123!', 10);
  const adminPasswordHash = await bcrypt.hash('Admin123!', 10);
  const userPasswordHash = await bcrypt.hash('User123!', 10);

  const usersData = [
    { email: 'superadmin@prepiq.com', name: 'Super Admin', role: GlobalRole.SUPER_ADMIN, password: passwordHash },
    { email: 'admin@prepiq.com', name: 'Content Admin', role: GlobalRole.ADMIN, password: adminPasswordHash },
    { email: 'user1@prepiq.com', name: 'Alex Johnson', role: GlobalRole.USER, password: userPasswordHash },
    { email: 'user2@prepiq.com', name: 'Maria Garcia', role: GlobalRole.USER, password: userPasswordHash },
    { email: 'user3@prepiq.com', name: 'James Okafor', role: GlobalRole.USER, password: userPasswordHash },
    { email: 'user4@prepiq.com', name: 'Sophie Chen', role: GlobalRole.USER, password: userPasswordHash },
    { email: 'user5@prepiq.com', name: 'David Mwangi', role: GlobalRole.USER, password: userPasswordHash },
    // Organization Users
    { email: 'acme-admin@prepiq.com', name: 'Acme Admin', role: GlobalRole.USER, password: adminPasswordHash },
    { email: 'acme-manager@prepiq.com', name: 'Acme Manager', role: GlobalRole.USER, password: adminPasswordHash },
    { email: 'rsb-admin@prepiq.com', name: 'RSB Admin', role: GlobalRole.USER, password: adminPasswordHash },
    { email: 'tr-admin@prepiq.com', name: 'TechRecruit Admin', role: GlobalRole.USER, password: adminPasswordHash },
    { email: 'tr-manager@prepiq.com', name: 'TechRecruit Manager', role: GlobalRole.USER, password: adminPasswordHash },
  ];

  const userMap: Record<string, string> = {};
  for (const u of usersData) {
    const created = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, isActive: true },
    });
    userMap[u.email] = created.id;
  }
  console.log('Upserted Users');

  // 4. Organizations
  const orgsData = [
    {
      slug: 'acme-corp', name: 'Acme Corp', email: 'hr@acmecorp.com', plan: OrgPlan.PRO, primaryColor: '#F97316', status: OrgStatus.ACTIVE, seatsLimit: 100,
      members: [
        { email: 'acme-admin@prepiq.com', role: OrgMemberRole.ADMIN },
        { email: 'acme-manager@prepiq.com', role: OrgMemberRole.MANAGER }
      ]
    },
    {
      slug: 'rwanda-schools', name: 'Rwanda Schools Board', email: 'admin@rsb.rw', plan: OrgPlan.STARTER, primaryColor: '#0EA5E9', status: OrgStatus.ACTIVE, seatsLimit: 50,
      members: [
        { email: 'rsb-admin@prepiq.com', role: OrgMemberRole.ADMIN }
      ]
    },
    {
      slug: 'techrecruit', name: 'TechRecruit Ltd', email: 'ops@techrecruit.io', plan: OrgPlan.ENTERPRISE, primaryColor: '#10B981', status: OrgStatus.ACTIVE, seatsLimit: 500,
      members: [
        { email: 'tr-admin@prepiq.com', role: OrgMemberRole.ADMIN },
        { email: 'tr-manager@prepiq.com', role: OrgMemberRole.MANAGER }
      ]
    }
  ];

  const orgMap: Record<string, string> = {};
  for (const o of orgsData) {
    const createdOrg = await prisma.organization.upsert({
      where: { slug: o.slug },
      update: {},
      create: {
        slug: o.slug, name: o.name, email: o.email, plan: o.plan, primaryColor: o.primaryColor, status: o.status, seatsLimit: o.seatsLimit
      }
    });
    orgMap[o.slug] = createdOrg.id;

    for (const m of o.members) {
      await prisma.orgMember.upsert({
        where: { orgId_userId: { orgId: createdOrg.id, userId: userMap[m.email] } },
        update: {},
        create: {
          orgId: createdOrg.id,
          userId: userMap[m.email],
          role: m.role
        }
      });
    }
  }
  console.log('Upserted Organizations');

  // 5. Tests & Questions
  const levels = [
    { level: DifficultyLevel.BEGINNER, totalDurationSecs: 1500, defaultQuestionSecs: 60, minQ: 20, maxQ: 25 },
    { level: DifficultyLevel.INTERMEDIATE, totalDurationSecs: 2400, defaultQuestionSecs: 90, minQ: 25, maxQ: 30 },
    { level: DifficultyLevel.ADVANCED, totalDurationSecs: 3000, defaultQuestionSecs: 120, minQ: 25, maxQ: 30 }
  ];

  const testMap: Record<string, string> = {};
  const allTests: any[] = [];
  
  for (const cat of categories) {
    for (const lvl of levels) {
      // Create Test
      // Note: Test doesn't have a unique constraint on title+level easily addressable via upsert in Prisma unless we add it,
      // so we use findFirst then create
      const title = `${cat.label} - ${lvl.level}`;
      let test = await prisma.test.findFirst({
        where: { title, level: lvl.level, categoryId: categoryMap[cat.slug] }
      });
      if (!test) {
        test = await prisma.test.create({
          data: {
            title,
            level: lvl.level,
            categoryId: categoryMap[cat.slug],
            totalDurationSecs: lvl.totalDurationSecs,
            defaultQuestionSecs: lvl.defaultQuestionSecs,
            minQuestions: lvl.minQ,
            maxQuestions: lvl.maxQ,
            isActive: true,
            publishedAt: new Date()
          }
        });
      }
      testMap[`${cat.slug}-${lvl.level}`] = test.id;
      allTests.push(test);

      // Create 25 questions per test
      const qCount = await prisma.question.count({ where: { testId: test.id } });
      if (qCount < 25) {
        const questionsToCreate = 25 - qCount;
        const qData = [];
        for (let i = 0; i < questionsToCreate; i++) {
          const options = [
            { id: 'A', text: 'Option A' },
            { id: 'B', text: 'Option B' },
            { id: 'C', text: 'Option C' },
            { id: 'D', text: 'Option D' },
          ];
          qData.push({
            testId: test.id,
            text: `Sample question ${i + 1} for ${title}`,
            options,
            correctOptionId: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
            explanation: `This is the explanation for question ${i + 1}.`,
            difficulty: Math.floor(Math.random() * 5) + 1,
            topic: `Topic ${i % 5}`,
            isActive: true
          });
        }
        await prisma.question.createMany({ data: qData });
      }
    }
  }
  console.log('Upserted Tests and Questions');

  // 6. Campaigns
  const campaignsData = [
    {
      orgSlug: 'acme-corp',
      name: 'Q1 2025 Graduate Assessment',
      status: CampaignStatus.ACTIVE,
      tests: [`${TestCategorySlug.NUMERICAL}-${DifficultyLevel.INTERMEDIATE}`, `${TestCategorySlug.VERBAL}-${DifficultyLevel.INTERMEDIATE}`],
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      inviteCount: 10
    },
    {
      orgSlug: 'acme-corp',
      name: 'Technical Aptitude Round 2',
      status: CampaignStatus.DRAFT,
      tests: [`${TestCategorySlug.ABSTRACT}-${DifficultyLevel.ADVANCED}`],
      startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      inviteCount: 0
    },
    {
      orgSlug: 'rwanda-schools',
      name: 'Teacher Recruitment 2025',
      status: CampaignStatus.ACTIVE,
      tests: [`${TestCategorySlug.VERBAL}-${DifficultyLevel.BEGINNER}`, `${TestCategorySlug.SITUATIONAL}-${DifficultyLevel.BEGINNER}`],
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      inviteCount: 5
    },
    {
      orgSlug: 'techrecruit',
      name: 'Software Engineer Pipeline',
      status: CampaignStatus.ACTIVE,
      tests: [`${TestCategorySlug.NUMERICAL}-${DifficultyLevel.ADVANCED}`, `${TestCategorySlug.ABSTRACT}-${DifficultyLevel.ADVANCED}`],
      startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      inviteCount: 15
    }
  ];

  for (const c of campaignsData) {
    let campaign = await prisma.campaign.findFirst({
      where: { name: c.name, orgId: orgMap[c.orgSlug] }
    });
    if (!campaign) {
      campaign = await prisma.campaign.create({
        data: {
          orgId: orgMap[c.orgSlug],
          name: c.name,
          status: c.status,
          startDate: c.startDate,
          endDate: c.endDate,
        }
      });
      // Attach tests
      for (const t of c.tests) {
        await prisma.campaignsOnTests.create({
          data: {
            campaignId: campaign.id,
            testId: testMap[t]
          }
        });
      }
      
      // Create Invitations
      for (let i = 0; i < c.inviteCount; i++) {
        await prisma.campaignInvitation.create({
          data: {
            campaignId: campaign.id,
            orgId: orgMap[c.orgSlug],
            email: `candidate${i}@${c.orgSlug}.com`,
            name: `Candidate ${i}`,
            status: [ParticipantStatus.INVITED, ParticipantStatus.STARTED, ParticipantStatus.COMPLETED][i % 3]
          }
        });
      }
    }
  }
  console.log('Upserted Campaigns');

  // 7. TestAttempts for users
  const userEmails = ['user1@prepiq.com', 'user2@prepiq.com', 'user3@prepiq.com', 'user4@prepiq.com', 'user5@prepiq.com'];
  
  for (const email of userEmails) {
    const uId = userMap[email];
    const attemptsCount = await prisma.testAttempt.count({ where: { userId: uId } });
    if (attemptsCount < 5) {
      for (let i = 0; i < 5; i++) {
        const tId = allTests[Math.floor(Math.random() * allTests.length)].id;
        await prisma.testAttempt.create({
          data: {
            userId: uId,
            testId: tId,
            questionOrder: [],
            answers: {},
            score: Math.floor(Math.random() * 45) + 50, // 50 - 95
            totalQuestions: 25,
            timeTakenSecs: 1000 + Math.floor(Math.random() * 1000),
            startedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
            submittedAt: new Date(),
            expiresAt: new Date()
          }
        });
      }
    }
  }
  console.log('Upserted Test Attempts');

  console.log('Seed completed successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
