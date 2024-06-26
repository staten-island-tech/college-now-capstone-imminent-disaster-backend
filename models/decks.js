const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const deckSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Please create a deck name",
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  image: String,
  cards: {
    type: Array,
    required: "Please add cards to your deck.",
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// foreign field ref.populate so deck has reference to user

deckSchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    next();
    return;
  }
  this.slug = slugify(this.name);
  next();
});

module.exports = mongoose.model("Deck", deckSchema);
