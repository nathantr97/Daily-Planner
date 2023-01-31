// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var hourBlock= [
  [$("#hour-09")],
  [$("#hour-10")],
  [$("#hour-11")],
  [$("#hour-12")],
  [$("#hour-13")],
  [$("#hour-14")],
  [$("#hour-15")],
  [$("#hour-16")],
  [$("#hour-17")],
  [$("#hour-18")],
];

// added function to make Save button interactive and logs user inputs

$(function () {
 var saveBtn= $(".saveBtn");
 var containerDiv= $("#container");

 saveBtn.on("click", function() {
    var itemArray=[];

    for (i = 0; i < 10; i++) {
      var textInput= containerDiv
      .children()
      .eq(i)
      .children(".description")
      .val()
      .trim();

  // save user datas and push them into local storage
      itemArray.push(textInput);
      localStorage.setItem("savedText", JSON.stringify(itemArray));
      console.log(itemArray);
    }
 });
  
  //  added 3 conditional statements to determine which hours fall into past, present or future status
  function timeCheck() {
  var currentHour= dayjs().format("HH");

  for (i=0; i< hourBlock.length; i++) {
    var blockHour= hourBlock[i][0];
  // present status
    if (hourBlock[i][0][0].id == "hour-" + currentHour) {
      blockHour.addClass("present");}
  // future status
      else if (hourBlock[i][0][0].id > "hour-" + currentHour) {
               blockHour.addClass("future");
  // past status
    } else {
               blockHour.addClass("past");
      }
  }
}

  timeCheck();

// added function to save what events and descriptions from users to localstorage
// console log will show 10 hour-variables and what description each hour contains

  function grabSaved() {
    var containerDiv= $("#container");
    var savedItems= JSON.parse(localStorage.getItem("savedtext"));

    if (savedItems != null) {
      for (i=0; i < 10; i++) {
        var textInput = containerDiv
        .children()
        .eq(i)
        .children(".description");

        textInput.text(savedItems[i]);
      }
      // if no data has been entered then console log will show no data found
    } else {
      console.log("No data found.");
    }
  }

  grabSaved();

  // current day and time is displayed at the top of the webpage when users open the calendar

setInterval(timeCheck, 1000);
  var today =dayjs().format("dddd, MMMM D, YYYY h:mm a");
  $("#currentDay").text(today);
});
