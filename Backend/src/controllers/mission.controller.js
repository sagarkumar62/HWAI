import Mission from "../models/mission.model.js";
import { createMissionService, updateMissionService } from "../services/mission.service.js";

// Create a new mission
export async function createMission(req, res) {
  try {
    const fileBuffer = req.file && req.file.buffer;
    // Pass all fields and fileBuffer to the service
    const createdBy = req.user && req.user.id;
    const mission = await createMissionService({ ...req.body, imageBuffer: fileBuffer, createdBy });
    res.status(201).json({ message: "Mission created successfully.", mission });
  } catch (error) {
    res.status(500).json({ message: "Mission creation failed.", error: error.message });
  }
}

// Get all missions
export async function getAllMissions(req, res) {
  try {
    const missions = await Mission.find();
    res.status(200).json(missions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch missions.", error: error.message });
  }
}

// Get a single mission by ID
export async function getMissionById(req, res) {
  try {
    const { id } = req.params;
    const mission = await Mission.findById(id);
    if (!mission) {
      return res.status(404).json({ message: "Mission not found." });
    }
    res.status(200).json(mission);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch mission.", error: error.message });
  }
}

// Update a mission
export async function updateMission(req, res) {
  try {
    const { id } = req.params;
    const fileBuffer = req.file && req.file.buffer;
    const updatedBy = req.user && req.user.id;
    const mission = await updateMissionService({ id, ...req.body, imageBuffer: fileBuffer, updatedBy });
    if (!mission) {
      return res.status(404).json({ message: "Mission not found." });
    }
    res.status(200).json({ message: "Mission updated successfully.", mission });
  } catch (error) {
    res.status(500).json({ message: "Mission update failed.", error: error.message });
  }
}

// Delete a mission
export async function deleteMission(req, res) {
  try {
    const { id } = req.params;
    const mission = await Mission.findByIdAndDelete(id);
    if (!mission) {
      return res.status(404).json({ message: "Mission not found." });
    }
    res.status(200).json({ message: "Mission deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Mission deletion failed.", error: error.message });
  }
}
