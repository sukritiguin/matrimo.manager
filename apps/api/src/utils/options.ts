const imageOptions = {
  select: {
    url: true,
    filename: true,
    id: true,
    mimetype: true,
  },
};

const ownerOptions = {
  select: {
    id: true,
    name: true,
    username: true,
    createdAt: true,
    image: imageOptions,
  },
};

const categoryOptions = {
  select: {
    id: true,
    name: true,
  },
};

const canvasOptions = {
  omit: {
    revokedAt: true,
    userId: true,
  },
};

const eventOptions = {
  omit: {
    isArchive: true,
    revokedAt: true,
    ownerId: true,
    categoryId: true,
  },
  include: {
    canvas: canvasOptions,
    category: categoryOptions,
    images: imageOptions,
    owner: ownerOptions,
  },
};

export const Options = {
  eventOptions,
  imageOptions,
  ownerOptions,
  categoryOptions,
  canvasOptions,
};
