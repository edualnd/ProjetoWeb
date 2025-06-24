import { PrismaClient, User_role } from '@prisma/client';
import { hashPass } from '../utils/security/bcrypt/bcryptUtils.js';

const prisma = new PrismaClient();

async function main() {
  // Limpar TODOS os dados existentes
  await prisma.$transaction([
    prisma.rating.deleteMany(),
    prisma.comments.deleteMany(),
    prisma.eventSubscription.deleteMany(),
    prisma.publication.deleteMany(),
    prisma.follows.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // ========== USUÁRIOS ==========
  const users = await prisma.user.createMany({
    data: [
      // PROFISSIONAIS (com nome e documento)
      {
        username: 'coach_futebol',
        email: 'futebol@pro.com',
        password: await hashPass('Qwerty123'),
        role: 'PROFESSIONAL',
        name: 'Carlos Treinador',
        document: '11122233344',
        bio: 'Treinador de futebol profissional',
      },
      {
        username: 'mestre_natacao',
        email: 'natacao@pro.com',
        password: await hashPass('Qwerty123'),
        role: 'PROFESSIONAL',
        name: 'Ana Silva',
        document: '22233344455',
        bio: 'Instrutora de natação olímpica',
      },
      {
        username: 'personal_trainer',
        email: 'personal@pro.com',
        password: await hashPass('Qwerty123'),
        role: 'PROFESSIONAL',
        name: 'Marcos Fitness',
        document: '33344455566',
        bio: 'Personal trainer certificado',
      },

      // USUÁRIOS COMUNS
      {
        username: 'fã_esportes',
        email: 'fan@esporte.com',
        password: await hashPass('Qwerty123'),
        role: 'COMMON',
        bio: 'Apaixonado por todos os esportes',
      },
      {
        username: 'corredor_rua',
        email: 'run@corrida.com',
        password: await hashPass('Qwerty123'),
        role: 'COMMON',
        bio: 'Corredor amador de rua',
      },
      {
        username: 'basqueteiro',
        email: 'basket@fã.com',
        password: await hashPass('Qwerty123'),
        role: 'COMMON',
        bio: 'Fã de basquete 24/7',
      },
    ],
  });

  const [
    coachFutebol,
    mestreNatacao,
    personalTrainer,
    fanEsportes,
    corredor,
    basqueteiro,
  ] = await prisma.user.findMany();

  // ========== PUBLICAÇÕES ==========
  const publications = await prisma.publication.createMany({
    data: [
      // Eventos profissionais
      {
        authorId: coachFutebol.userId,
        text: 'Clínica de futebol para jovens - vagas limitadas!',
        isEvent: true,
        title: 'Clínica de Futebol',
        eventDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        registrationStartDate: new Date(),
        registrationEndDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      },
      {
        authorId: mestreNatacao.userId,
        text: 'Workshop de natação para adultos iniciantes',
        isEvent: true,
        title: 'Workshop de Natação',
        eventDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        registrationStartDate: new Date(),
        registrationEndDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      },
      {
        authorId: personalTrainer.userId,
        text: 'Maratona de treinos funcionais - 1 semana intensiva',
        isEvent: true,
        title: 'Maratona Fitness',
        eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        registrationStartDate: new Date(),
        registrationEndDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      },

      // Posts normais
      {
        authorId: fanEsportes.userId,
        text: 'Alguém para jogar vôlei na praia neste final de semana?',
        isEvent: false,
      },
      {
        authorId: corredor.userId,
        text: 'Completei meus primeiros 5km sem parar hoje!',
        isEvent: false,
      },
      {
        authorId: basqueteiro.userId,
        text: 'Melhores jogadas da NBA esta semana? Vamos discutir!',
        isEvent: false,
      },
      {
        authorId: coachFutebol.userId,
        text: 'Dicas para melhorar seu chute a gol - técnicas profissionais',
        isEvent: false,
      },
    ],
  });

  const [
    clinicaFutebol,
    workshopNatacao,
    maratonaFitness,
    postVolei,
    postCorrida,
    postNBA,
    postDicasFutebol,
  ] = await prisma.publication.findMany();

  // ========== SEGUIDORES ==========
  await prisma.follows.createMany({
    data: [
      // Profissionais seguindo outros profissionais
      { followerById: coachFutebol.userId, followingId: mestreNatacao.userId },
      {
        followerById: mestreNatacao.userId,
        followingId: personalTrainer.userId,
      },

      // Usuários comuns seguindo profissionais
      { followerById: fanEsportes.userId, followingId: coachFutebol.userId },
      { followerById: fanEsportes.userId, followingId: mestreNatacao.userId },
      { followerById: corredor.userId, followingId: personalTrainer.userId },
      { followerById: basqueteiro.userId, followingId: coachFutebol.userId },

      // Seguidores entre usuários comuns
      { followerById: corredor.userId, followingId: fanEsportes.userId },
      { followerById: basqueteiro.userId, followingId: corredor.userId },
    ],
  });

  // ========== INSCRIÇÕES EM EVENTOS ==========
  await prisma.eventSubscription.createMany({
    data: [
      // Inscrições nos eventos
      {
        userId: fanEsportes.userId,
        publicationId: clinicaFutebol.publicationId,
      },
      {
        userId: basqueteiro.userId,
        publicationId: clinicaFutebol.publicationId,
      },
      { userId: corredor.userId, publicationId: workshopNatacao.publicationId },
      {
        userId: fanEsportes.userId,
        publicationId: maratonaFitness.publicationId,
      },
      {
        userId: mestreNatacao.userId,
        publicationId: maratonaFitness.publicationId,
      },
      {
        userId: personalTrainer.userId,
        publicationId: workshopNatacao.publicationId,
      },
    ],
  });

  // ========== COMENTÁRIOS ==========
  await prisma.comments.createMany({
    data: [
      // Comentários em eventos
      {
        authorId: fanEsportes.userId,
        publicationId: clinicaFutebol.publicationId,
        comment: 'Qual a idade mínima para participar?',
      },
      {
        authorId: coachFutebol.userId,
        publicationId: clinicaFutebol.publicationId,
        comment: 'A partir de 12 anos! Teremos turmas separadas por idade.',
      },
      {
        authorId: corredor.userId,
        publicationId: workshopNatacao.publicationId,
        comment: 'Precisa saber nadar ou é para iniciantes completos?',
      },

      // Comentários em posts normais
      {
        authorId: mestreNatacao.userId,
        publicationId: postCorrida.publicationId,
        comment: 'Parabéns pela conquista! Continue assim!',
      },
      {
        authorId: basqueteiro.userId,
        publicationId: postNBA.publicationId,
        comment: 'A jogada do Curry no terceiro quarto foi incrível!',
      },
      {
        authorId: fanEsportes.userId,
        publicationId: postDicasFutebol.publicationId,
        comment: 'Ótimas dicas! Vou praticar no final de semana.',
      },
    ],
  });

  // ========== AVALIAÇÕES ==========
  await prisma.rating.createMany({
    data: [
      // Avaliações para eventos
      {
        authorId: fanEsportes.userId,
        publicationId: clinicaFutebol.publicationId,
        rating: 5,
      },
      {
        authorId: basqueteiro.userId,
        publicationId: clinicaFutebol.publicationId,
        rating: 4.5,
      },
      {
        authorId: corredor.userId,
        publicationId: workshopNatacao.publicationId,
        rating: 4,
      },
      {
        authorId: personalTrainer.userId,
        publicationId: workshopNatacao.publicationId,
        rating: 5,
      },
      {
        authorId: fanEsportes.userId,
        publicationId: maratonaFitness.publicationId,
        rating: 4.5,
      },

      // Avaliações para posts normais
      {
        authorId: mestreNatacao.userId,
        publicationId: postCorrida.publicationId,
        rating: 5,
      },
      {
        authorId: coachFutebol.userId,
        publicationId: postNBA.publicationId,
        rating: 3.5,
      },
      {
        authorId: corredor.userId,
        publicationId: postDicasFutebol.publicationId,
        rating: 4.5,
      },
      {
        authorId: basqueteiro.userId,
        publicationId: postVolei.publicationId,
        rating: 4,
      },
      {
        authorId: personalTrainer.userId,
        publicationId: postCorrida.publicationId,
        rating: 5,
      },
    ],
  });

  console.log('✅ Seed completo com dados robustos!');
  console.log(`👥 Usuários: ${await prisma.user.count()}`);
  console.log(`📝 Publicações: ${await prisma.publication.count()}`);
  console.log(`🤝 Seguidores: ${await prisma.follows.count()}`);
  console.log(
    `🎟️ Inscrições em eventos: ${await prisma.eventSubscription.count()}`,
  );
  console.log(`💬 Comentários: ${await prisma.comments.count()}`);
  console.log(`⭐ Avaliações: ${await prisma.rating.count()}`);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
