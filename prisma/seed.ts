import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // // Clear existing data
  // await prisma.quiz.deleteMany({})

  // // // Create sample todos
  // await prisma.todo.create({
  //   data: {
  //     text: 'Complete project documentation',
  //     completed: false,
  //     dueDate: new Date('2024-04-15'),
  //   },
  // })

  // await prisma.todo.create({
  //   data: {
  //     text: 'Review pull requests',
  //     completed: true,
  //     dueDate: new Date('2024-04-10'),
  //   },
  // })

  // // Create sample quizzes
  await prisma.quiz.create({
    data: {
      title: 'Basic Japanese Phrases',
      description: 'Learn essential Japanese phrases for beginners',
      targetLanguage: 'JP',
      level: 'Beginner',
    },
  })

  // await prisma.quiz.create({
  //   data: {
  //     title: 'Spanish Verb Conjugation',
  //     description: 'Practice common Spanish verb conjugations',
  //     targetLanguage: 'Spanish',
  //     level: 'Intermediate',
  //   },
  // })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 