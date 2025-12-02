import Review from "../models/Review.js";

export const getAllReviews = async (req, res) => {
  try {
    const { entityType, entityId } = req.query;
    const filter = {};
    if (entityType) filter.entityType = entityType;
    if (entityId) filter.entityId = entityId;

    const reviews = await Review.find(filter).populate(
      "user",
      "-password -__v"
    );
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { entityType, entityId, rating, comment, user } = req.body;
    const review = await Review.create({
      entityType,
      entityId,
      rating,
      comment,
      user,
    });
    await review.populate("user", "-password -__v");
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
