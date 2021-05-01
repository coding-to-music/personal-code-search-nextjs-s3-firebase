import mongoose from 'mongoose'

const CodeSchema = new mongoose.Schema({
  imageUrl: {
    /* The snippet image url of the specified code in s3 */
    type: String,
    required: [true, 'Snippet image url can\'t be empty'],
  },
  tag: {
    /* Snippet tag for searching purposes */
    type: String,
    required: [true, 'Tag can\'t be empty']
  },
  description: {
    /* Snippet description to understand better */
    type: String,
    required: [true, 'Description can\'t be empty']
  },
})

export default mongoose.models['Code'] || mongoose.model('Code', CodeSchema);