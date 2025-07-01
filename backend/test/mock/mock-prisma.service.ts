export const mockPrismaService = {
  message: {
    create: jest.fn().mockResolvedValue({
      ...require('./mock-message').mockMessage,
    }),
    findMany: jest.fn().mockResolvedValue([
      require('./mock-message').mockMessage,
    ]),
  },
};
