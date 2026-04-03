import { Request, Response } from "express";
import Requirement from "../models/Requirement";

interface CreateRequirementPayload {
  eventName: string;
  eventType: string;
  date: {
    start: string;
    end?: string;
  };
  location: string;
  venue?: string;
  category: "planner" | "performer" | "crew" | "";
  plannerDetails?: { budget: string | number };
  performerDetails?: { expertise: string };
  crewDetails?: { role: string; equipments?: string };
}

export const createRequirement = async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      eventName,
      eventType,
      date,
      location,
      venue,
      category,
      plannerDetails,
      performerDetails,
      crewDetails,
    } = req.body as CreateRequirementPayload;
    
    if (category === "planner" && !plannerDetails) {
      return res.status(400).json({
        success: false,
        message: "plannerDetails are required when category is 'planner'",
      });
    }
    if (category === "performer" && !performerDetails) {
      return res.status(400).json({
        success: false,
        message: "performerDetails are required when category is 'performer'",
      });
    }
    if (category === "crew" && !crewDetails) {
      return res.status(400).json({
        success: false,
        message: "crewDetails are required when category is 'crew'",
      });
    }

    const requirement = await Requirement.create({
      eventName,
      eventType,
      date,
      location,
      venue: venue || undefined,
      category,
      plannerDetails: category === "planner" ? plannerDetails : undefined,
      performerDetails: category === "performer" ? performerDetails : undefined,
      crewDetails: category === "crew" ? crewDetails : undefined,
    });

    return res.status(201).json({
      success: true,
      message: `Requirement posted successfully under category: ${category}`,
      data: requirement,
    });
  } catch (error: any) {
    
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    console.error("createRequirement error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getAllRequirements = async (req: Request, res: Response): Promise<any> => {
  try {
    const filter: any = {};
    const { category, status } = req.query;

    if (category) {
      if (!["planner", "performer", "crew"].includes(category as string)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category. Must be planner, performer, or crew.",
        });
      }
      filter.category = category as string;
    }

    if (status) {
      filter.status = status as string;
    }

    const requirements = await Requirement.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: requirements.length,
      data: requirements,
    });
  } catch (error) {
    console.error("getAllRequirements error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getRequirementById = async (req: Request, res: Response): Promise<any> => {
  try {
    const requirement = await Requirement.findById(req.params.id);
    if (!requirement) {
      return res.status(404).json({ success: false, message: "Requirement not found" });
    }
    return res.status(200).json({ success: true, data: requirement });
  } catch (error: any) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid requirement ID" });
    }
    console.error("getRequirementById error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateRequirement = async (req: Request, res: Response): Promise<any> => {
  try {
    const requirement = await Requirement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!requirement) {
      return res.status(404).json({ success: false, message: "Requirement not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Requirement updated successfully",
      data: requirement,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid requirement ID" });
    }
    console.error("updateRequirement error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const deleteRequirement = async (req: Request, res: Response): Promise<any> => {
  try {
    const requirement = await Requirement.findByIdAndDelete(req.params.id);
    if (!requirement) {
      return res.status(404).json({ success: false, message: "Requirement not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Requirement deleted successfully",
    });
  } catch (error: any) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid requirement ID" });
    }
    console.error("deleteRequirement error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
