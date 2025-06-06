// import { validationResult } from "express-validator";
// import doctorModel from "../models/doctor.model.js";
// import jwt from "jsonwebtoken";

// export async function registerDoctor(req, res) {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email } = req.body;

//     const existingDoctor = await doctorModel.findOne({ email });
//     if (existingDoctor) {
//       return res.status(409).json({ message: "Email already exists" });
//     }

//     // Create doctor with plain password, hashing will happen via schema pre-save hook
//     const newDoctor = new doctorModel(req.body);
//     await newDoctor.save(); // Triggers password hash & validation

//     const token = newDoctor.generateAuthToken();
//     const doctorResponse = newDoctor.toObject();
//     delete doctorResponse.password;

//     return res.status(201).json({
//       message: "Doctor registered successfully",
//       token,
//       doctor: doctorResponse,
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// export async function signInDoctor(req, res) {
//   try {
//     // Validate request input
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     // Check if doctor exists
//     const doctor = await doctorModel.findOne({ email }).select("+password");

//     if (!doctor) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Validate password
//     try {
//       const isPasswordValid = await doctor.comparePassword(password);
      
//       if (!isPasswordValid) {
//         return res.status(401).json({ message: "Invalid email or password" });
//       }

//       // Generate authentication token
//       const token = doctor.generateAuthToken();

//       // Remove password from response
//       const doctorResponse = doctor.toObject();
//       delete doctorResponse.password;

//       // Update online status without validation
//       await doctorModel.findByIdAndUpdate(
//         doctor._id,
//         {
//           $set: {
//             isOnline: true,
//             lastActive: new Date()
//           }
//         },
//         { 
//           new: true,
//           validateBeforeSave: false
//         }
//       );

//       // Respond with doctor data & token
//       return res.status(200).json({
//         message: "Login successful",
//         token,
//         doctor: doctorResponse,
//       });
//     } catch (passwordError) {
//       console.error("Password comparison error:", passwordError);
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// export const getDoctorProfile = async (req, res) => {
//   try {
//     if (!req.doctor) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }

//     // Remove password from doctor data before sending response
//     const doctorResponse = req.doctor.toObject();
//     delete doctorResponse.password;

//     return res.status(200).json(doctorResponse);
//   } catch (error) {
//     console.error("Profile retrieval error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const updateDoctorStatus = async (req, res) => {
//   try {
//     console.log('hello from asy');
    
//     // Extract token from headers
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized. No token provided.",
//       });
//     }

//     // Verify and decode token
//     const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
//     const userId = decoded._id; // Ensure your JWT contains `id`

//     // Extract status from request
//     const { isOnline } = req.body;

//     if (typeof isOnline !== "boolean") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid status. Must be a boolean value.",
//       });
//     }

//     // Update user status
//     const updatedUser = await doctorModel
//       .findByIdAndUpdate(
//         userId,
//         {
//           isOnline,
//           lastActive: new Date(),
//           updatedAt: new Date(),
//         },
//         { new: true, runValidators: true }
//       )
//       .select("-password");

//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: `Status updated to ${isOnline ? "online" : "offline"}.`,
//       data: {
//         isOnline: updatedUser.isOnline,
//         lastActive: updatedUser.lastActive,
//       },
//     });
//   } catch (error) {
//     console.error("Error updating status:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while updating status.",
//       error: error.message,
//     });
//   }
// };

// export const getAvailableDoctors = async (req, res) => {
//   try {
//     const { specialization, isOnline } = req.query;

//     // Build the query object
//     const query = {};

//     // Add online status to query if provided
//     if (isOnline !== undefined) {
//       // Convert string to boolean
//       query.isOnline = isOnline === "true";
//     }

//     // Add specialization to query if provided
//     if (specialization) {
//       query.specialization = specialization;
//     }

//     // Find doctors matching the criteria
//     const doctors = await doctorModel.find(query)
//       .select({
//         firstName: 1,
//         lastName: 1,
//         specialization: 1,
//         experience: 1,
//         phoneNumber: 1,
//         isOnline: 1,
//         qualifications: 1,
//         reviews: 1,
//         availability: 1,
//       })
//       .sort({ experience: -1 }); // Sort by experience (most experienced first)

//     res.status(200).json({
//       success: true,
//       count: doctors.length,
//       data: doctors,
//     });
//   } catch (error) {
//     console.error("Error finding doctors:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching doctors",
//       error: error.message,
//     });
//   }
// };

import { validationResult } from "express-validator";
import doctorModel from "../models/doctor.model.js";
import jwt from "jsonwebtoken";

export async function registerDoctor(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Create doctor with plain password, hashing will happen via schema pre-save hook
    const newDoctor = new doctorModel(req.body);
    await newDoctor.save(); // Triggers password hash & validation

    const token = newDoctor.generateAuthToken();
    const doctorResponse = newDoctor.toObject();
    delete doctorResponse.password;

    return res.status(201).json({
      message: "Doctor registered successfully",
      token,
      doctor: doctorResponse,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function signInDoctor(req, res) {
  try {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if doctor exists
    const doctor = await doctorModel.findOne({ email }).select("+password");

    if (!doctor) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Validate password
    try {
      const isPasswordValid = await doctor.comparePassword(password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate authentication token
      const token = doctor.generateAuthToken();

      // Remove password from response
      const doctorResponse = doctor.toObject();
      delete doctorResponse.password;

      // Update online status without validation
      await doctorModel.findByIdAndUpdate(
        doctor._id,
        {
          $set: {
            isOnline: true,
            lastActive: new Date()
          }
        },
        { 
          new: true,
          validateBeforeSave: false
        }
      );

      // Respond with doctor data & token
      return res.status(200).json({
        message: "Login successful",
        token,
        doctor: doctorResponse,
      });
    } catch (passwordError) {
      console.error("Password comparison error:", passwordError);
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getDoctorProfile = async (req, res) => {
  try {
    if (!req.doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Remove password from doctor data before sending response
    const doctorResponse = req.doctor.toObject();
    delete doctorResponse.password;

    return res.status(200).json(doctorResponse);
  } catch (error) {
    console.error("Profile retrieval error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateDoctorStatus = async (req, res) => {
  try {
    console.log('hello from asy');
    
    // Extract token from headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token provided.",
      });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decoded._id; // Ensure your JWT contains id

    // Extract status from request
    const { isOnline } = req.body;

    if (typeof isOnline !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be a boolean value.",
      });
    }

    // Update user status
    const updatedUser = await doctorModel
      .findByIdAndUpdate(
        userId,
        {
          isOnline,
          lastActive: new Date(),
          updatedAt: new Date(),
        },
        { new: true, runValidators: true }
      )
      .select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Status updated to ${isOnline ? "online" : "offline"}.`,
      data: {
        isOnline: updatedUser.isOnline,
        lastActive: updatedUser.lastActive,
      },
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating status.",
      error: error.message,
    });
  }
};

export const getAvailableDoctors = async (req, res) => {
  try {
    const { specialization, isOnline } = req.query;

    // Build the query object
    const query = {};

    // Add online status to query if provided
    if (isOnline !== undefined) {
      // Convert string to boolean
      query.isOnline = isOnline === "true";
    }

    // Add specialization to query if provided
    if (specialization) {
      query.specialization = specialization;
    }

    // Find doctors matching the criteria
    const doctors = await doctorModel.find(query)
      .select({
        firstName: 1,
        lastName: 1,
        specialization: 1,
        experience: 1,
        phoneNumber: 1,
        isOnline: 1,
        qualifications: 1,
        reviews: 1,
        availability: 1,
      })
      .sort({ experience: -1 }); // Sort by experience (most experienced first)

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    console.error("Error finding doctors:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching doctors",
      error: error.message,
    }); 
  }
};