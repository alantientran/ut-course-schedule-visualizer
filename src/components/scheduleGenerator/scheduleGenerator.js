import ExampleData from "../../ExampleData";

function schedule_generator() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const allSchedules = [];
  const curSchedule = [];

  const GroupCards = [
    [ExampleData[0], ExampleData[1]],
    [ExampleData[2], ExampleData[3]],
    [ExampleData[4], ExampleData[5]],
  ];

  const GroupCounts = [1, 2, 1];

  // Permutate to allow each group to add a class first
  for (let i = 0; i < GroupCards.length; i++) {
    // Move the first element of GroupCards to the end
    const firstElement = GroupCards.shift();
    GroupCards.push(firstElement);

    // Call addClassesFromGroups with the updated GroupCards configuration
    const selectedClasses = addClassesFromGroups(GroupCards, GroupCounts);
    allSchedules.push(selectedClasses);
  }
  // selectedClasses.map(section => section.time_and_locations[0].start_time)
  return allSchedules;
}

function addClassesFromGroups(GroupCards, GroupCounts) {
  const selectedClasses = [];
  const selectedCourses = new Set();

  GroupCards.forEach((group, groupIndex) => {
    let addedCount = 0;

    group.forEach((classObj) => {
      // Iterate over each class object in the group
      classObj.sections.forEach((section) => {
        // Iterate over each section of the class
        if (
          addedCount < GroupCounts[groupIndex] &&
          !selectedCourses.has(section.id)
        ) {
          let overlap = false;
          selectedClasses.forEach((selectedSection) => {
            if (checkOverlap(section, selectedSection)) {
              overlap = true;
            }
          });

          if (!overlap) {
            selectedClasses.push(section);
            selectedCourses.add(section.id);
            addedCount++;
          }
        }
      });
    });

    console.log(`Added ${addedCount} classes from Group ${groupIndex + 1}`);
  });
  console.log(selectedClasses);
  return selectedClasses;
}

function checkOverlap(section1, section2) {
  // Check if there's any overlap in timings
  for (const timeLoc1 of section1.time_and_locations) {
    for (const timeLoc2 of section2.time_and_locations) {
      if (timeLoc1.weekday.some((day) => timeLoc2.weekday.includes(day))) {
        const start1 = new Date(`2000-01-01T${timeLoc1.start_time}`);
        const end1 = new Date(`2000-01-01T${timeLoc1.end_time}`);
        const start2 = new Date(`2000-01-01T${timeLoc2.start_time}`);
        const end2 = new Date(`2000-01-01T${timeLoc2.end_time}`);
        if (!(end1 <= start2 || end2 <= start1)) {
          return true; // There's overlap
        }
      }
    }
  }
  return false; // No overlap
}

export default schedule_generator;

// The code below can print one schedule
// function schedule_generator() {
//   // Assume classesArr is structured as described:
//   const classesArr = [
//     [
//       {
//         className: "Math 101",
//         sections: [
//           {
//             startTime: "9:00 AM",
//             endTime: "10:00 AM",
//             sectionName: "Section A",
//             professor: "John Doe",
//           },
//           {
//             startTime: "10:15 AM",
//             endTime: "11:15 AM",
//             sectionName: "Section B",
//             professor: "Jane Smith",
//           },
//           // Add more sections as needed
//         ],
//       },
//       // Add more classes in this group as needed
//     ],
//     // Add more groups as needed
//   ];

//   // Loop through classesArr to access the start and end times of each section
//   classesArr.forEach((group, groupIndex) => {
//     console.log(`Group ${groupIndex + 1}:`);
//     group.forEach((classItem, classIndex) => {
//       console.log(`  Class ${classIndex + 1}: ${classItem.className}`);
//       classItem.sections.forEach((section, sectionIndex) => {
//         console.log(`    Section ${sectionIndex + 1}:`);
//         console.log(`      Start Time: ${section.startTime}`);
//         console.log(`      End Time: ${section.endTime}`);
//         console.log(`      Section Name: ${section.sectionName}`);
//         console.log(`      Professor: ${section.professor}`);
//       });
//     });
//   });

//   return <div></div>;
// }

// export default schedule_generator;

// This code can print each section info

// const section = GroupCards[0][0]; // Accessing the first section of the first group

// console.log("Section details:");
// console.log(`Course Major: ${section.course_major}`);
// console.log(`Course Number: ${section.course_number}`);
// console.log(`Course Name: ${section.course_name}`);
// console.log(`Section ID: ${section.id}`);
// console.log(`Professor: ${section.professor}`);
// console.log(`Weekday: ${section.time_and_locations[0].weekday}`);
// console.log(`Start Time: ${section.time_and_locations[0].start_time}`);
// console.log(`End Time: ${section.time_and_locations[0].end_time}`);
// console.log(`Location: ${section.time_and_locations[0].location}`);
// console.log(`Checked: ${section.checked}`);
