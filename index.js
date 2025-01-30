
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


//**=========================== PART 2 ============================================= */
//Todo: Filter throughout valid assignments 

function filterValidAssignments(AssignmentGroup){
    const now = new Date(); //get current date 
    // console.log(now);
    // console.log(Assignments);

    return AssignmentGroup.assignments.filter(assignment => {
        const dueDate = new Date(assignment.due_at);

        return !isNaN(dueDate.getTime()) && now >= dueDate;
    })
}

//**======================== PART 3 ================================================ */

function matchSubmissionsToAssignments(LearnerSubmissions, validAssignments){
    let learnerData = {}; //store submissions grouped by learner id

    LearnerSubmissions.forEach(submission => {
        const matchingAssignment = validAssignments.find(assignment => 
            assignment.id === submission.assignment_id
        );
        if (matchingAssignment){
            const {learner_id, assignment_id, submission:{score}} = submission;

            if (!learnerData[learner_id]){
                learnerData[learner_id] = {};// initialize learner data 
            }

            learnerData[learner_id][assignment_id] = score / matchingAssignment.points_possible;
        }
    })
    return learnerData;
}

console.log("Filtered Assignments:", filterValidAssignments(AssignmentGroup));
console.log("Learner Data:", matchSubmissionsToAssignments(LearnerSubmissions, filterValidAssignments(AssignmentGroup)));

//**======================== PART 3 ================================================ */

//Todo: Match learner submissions to valid assignments and apply late penalties
function matchSubmissionsToAssignments(LearnerSubmissions, validAssignments) {
    let learnerData = {}; // Store submissions grouped by learner_id

    LearnerSubmissions.forEach(submission => {
        const matchingAssignment = validAssignments.find(assignment =>
            assignment.id === submission.assignment_id
        );

        if (matchingAssignment) {
            const { learner_id, assignment_id, submission: { score, submitted_at } } = submission;
            const pointsPossible = matchingAssignment.points_possible;
            const dueDate = new Date(matchingAssignment.due_at);
            const submittedDate = new Date(submitted_at);

            let percentage = score / pointsPossible;

            // Apply late penalty if submitted after the due date
            if (submittedDate > dueDate) {
                percentage = Math.max(percentage - 0.1, 0); // Ensure percentage is not negative
            }

            if (!learnerData[learner_id]) {
                learnerData[learner_id] = { id: learner_id, totalScore: 0, totalWeight: 0 };
            }

            learnerData[learner_id][assignment_id] = percentage * 100; // Store individual assignment percentage
            learnerData[learner_id].totalScore += percentage * pointsPossible * matchingAssignment.group_weight;
            learnerData[learner_id].totalWeight += pointsPossible * matchingAssignment.group_weight;
        }
    });

    return learnerData;
}

//**======================== PART 4 (Final Formatting) ================================ */

//Todo: Compute final averages and return the required format
function getLearnerData(courseInfo, assignmentGroups, learnerSubmissions) {
    try {
        assignmentGroups.forEach(group => validateData(courseInfo, group));

        let learners = {};

        assignmentGroups.forEach(group => {
            const validAssignments = filterValidAssignments(group);
            const learnerScores = matchSubmissionsToAssignments(learnerSubmissions, validAssignments);

            // Merge results into learners object
            Object.entries(learnerScores).forEach(([id, data]) => {
                if (!learners[id]) {
                    learners[id] = { id: Number(id), avg: 0, totalScore: 0, totalWeight: 0 };
                }

                Object.entries(data).forEach(([key, value]) => {
                    if (key !== "totalScore" && key !== "totalWeight") {
                        learners[id][key] = value;
                    }
                });

                learners[id].totalScore += data.totalScore;
                learners[id].totalWeight += data.totalWeight;
            });
        });

        // Compute final averages
        return Object.values(learners).map(learner => {
            learner.avg = learner.totalWeight ? (learner.totalScore / learner.totalWeight) * 100 : 0;
            delete learner.totalScore;
            delete learner.totalWeight;
            return learner;
        });

    } catch (error) {
        console.error(error.message);
        return [];
    }
}
