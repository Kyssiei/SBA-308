
//! ============================== SANDBOX DATA =====================================================
// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
//   function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    // const result = [
    //   {
    //     id: 125,
    //     avg: 0.985, // (47 + 150) / (50 + 150)
    //     1: 0.94, // 47 / 50
    //     2: 1.0 // 150 / 150
    //   },
    //   {
    //     id: 132,
    //     avg: 0.82, // (39 + 125) / (50 + 150)
    //     1: 0.78, // 39 / 50
    //     2: 0.833 // late: (140 - 15) / 150
    //   }
    // ];
  
//     return result;
//   }
  
//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
//   console.log(result);

//! ======================== END OF DATA ======================================


//** ======================= PART 1 ========================================== */
//** GUIDANCE */
//You have four types of data:
// CourseInfo: Provides a course's ID and name.
// AssignmentGroup: Contains metadata about groups of assignments, including course_id to connect it to a course, group_weight, and assignments.
// AssignmentInfo: Details of individual assignments, including their ID, due date, and max points.
// LearnerSubmission: Tracks learner submissions for assignments, including their scores.

//Todo: Validate input using try/catch
//Todo: Validate assignment group data against the course info 

function validateData(courseInfo, AssignmentGroup){
    if (AssignmentGroup.course_id !== courseInfo.id){
        throw new Error ("Assignment Group does not belong to this course"); // assignment group does not match course id
    }
    if (typeof courseInfo.id !== 'number' || courseInfo.id <= 0){
        throw new Error ("Course ID should be a positive number"); // course info ID should be a number 
    }
    if (typeof AssignmentGroup.course_id !== 'number' || AssignmentGroup.course_id <= 0){
        throw new Error ("Assignment Group course ID should be a positive")
    }
    if (!Array.isArray(AssignmentGroup.assignments)){
        throw new Error("Assignments should be an Array")
    }
    AssignmentGroup.assignments.forEach(assignment =>{
        if (assignment.points_possible === 0){
            throw new Error (`Invalid data: Assignment ${assignment.id} has zero possible points.`)
        }
    })
    return true;
};


//**=========================== PART 2 ================================================= */
//Todo: Filter throughout valid assignments 

function filterValidAssignments(AssignmentGroup){
    const now = new Date(); //get current date 
    console.log(now);
    console.log(assignments);

    return AssignmentGroup.assignments.filter(assignment => {
        const dueDate = new Date(assignment.due_at);

        return !isNaN(dueDate.getTime()) && now >= dueDate;
    })
}

























// function getLearnerData(courseInfo, AssignmentGroup, LearnerSubmissions){ 
//     if (AssignmentGroup.course_id !== courseInfo.id){
//         throw new Error ("Assignment Group does not belong to this course"); // assignment group does not match course id
//     }
//     if (typeof courseInfo.id !== 'number'){
//         throw new Error ("Course ID should be a number"); // course info ID should be a number 
//     }
//     if (AssignmentGroup.assignments.some(a => a.points_possible === 0)){
//         throw new Error ("An assiggnment cannot have 0 points possible");
//     }

// }



//** ==================== PART 2 ======================================== */



// LearnerSubmissions.forEach(submission => {
//     // Check if the submission is a valid object
//     if (!submission || typeof submission !== 'object') {
//         throw new Error("Each learner submission must be a valid object.");
//     }

//     // Check for required properties
//     if (typeof submission.learner_id !== 'number') {
//         throw new Error("learner_id must be a number.");
//     }
//     if (typeof submission.assignment_id !== 'number') {
//         throw new Error("assignment_id must be a number.");
//     }
//     if (!submission.submission || typeof submission.submission !== 'object') {
//         throw new Error("Each submission must have a valid 'submission' object.");
//     }

//     // Check the properties of the submission object
//     const { submitted_at, score } = submission.submission;
//     if (typeof submitted_at !== 'string') {
//         throw new Error(`Invalid submitted_at for learner ${submission.learner_id}.`);
//     }
//     if (typeof score !== 'number') {
//         throw new Error(`Invalid score for learner ${submission.learner_id}.`);
//     }

//     // Log valid submissions for debugging
//     console.log(`Valid submission for learner ${submission.learner_id}:`, submission);
// })