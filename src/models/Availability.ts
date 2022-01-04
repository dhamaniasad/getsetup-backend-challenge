import {
  Schema, model, Document,
} from 'mongoose';

export interface IAvailability extends Document {
    userId: string;
    week: number;
    year: number;
    availability: [string[], string[], string[], string[], string[], string[], string[]]
}

const availabilitySchema = new Schema({
  week: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  userId: {
      type: String,
      required: true,
  },
availability: {
      type: Array,
    required: true
}
});

const Availability = model<IAvailability>('Availability', availabilitySchema);

export default Availability;
