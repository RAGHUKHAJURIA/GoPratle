import mongoose, { Document, Schema } from "mongoose";

export interface IPlannerDetails {
  budget: number | string;
}

export interface IPerformerDetails {
  expertise: string;
}

export interface ICrewDetails {
  role: string;
  equipments?: string;
}

export interface IRequirement extends Document {
  eventName: string;
  eventType: string;
  date: {
    start: Date;
    end?: Date;
  };
  location: string;
  venue?: string;
  category: "planner" | "performer" | "crew";
  details?: any;
  plannerDetails?: IPlannerDetails;
  performerDetails?: IPerformerDetails;
  crewDetails?: ICrewDetails;
}

const requirementSchema = new Schema(
  {
    eventName: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
    },

    eventType: {
      type: String,
      required: [true, "Event type is required"],
      trim: true,
    },

    date: {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
      },
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    venue: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      enum: ["planner", "performer", "crew"],
      required: true,
    },

    details: {
      type: Schema.Types.Mixed,
    },

    plannerDetails: {
      type: Schema.Types.Mixed,
    },
    
    performerDetails: {
      type: Schema.Types.Mixed,
    },

    crewDetails: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default mongoose.model<IRequirement>("Requirement", requirementSchema);
