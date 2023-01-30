// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var hourBlock=[
  [$("#hour-9")],
  [$("#hour-10")],
  [$("#hour-11")],
  [$("#hour-12")],
  [$("#hour-13")],
  [$("#hour-14")],
  [$("#hour-15")],
  [$("#hour-16")],
  [$("#hour-17")],
];


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

$(function () {

 var saveBtn= $(".saveBtn");
 var containerDiv= $("#container");

 saveBtn.on("click", function() {
    var itemArray=[];


    for (i=0; i<9; i++) {
      var textInput= containerDiv
      .children()
      .eq(i)
      .children(".description")
      .val()
      .trim();

      itemArray.push(textInput);
      localStorage.setItem("savedText", JSON.stringify(itemArray));
      console.log(itemArray);
    }
  
 });

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  function hourCheck() {
  var currentHour= dayjs().format("HH");

  for (i=0; i< hourBlock.lengthl; i++) {
    var blockHour= hourBlock[i][0];

    if (hourBlock[i][0][0].id == "hour-" + currentHour) {
      blockHour.addClass("present");

    } else if (hourBlock[i][0][0].id < "hour-" + currentHour) {
               blockHour.addClass("past");
    } else {
               blockHour.addClass("future");
      }
  }
}

  hourCheck();
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  function saveInfo() {
    var containerDiv= $("#container");
    var savedItems= JSON.parse(localStorage.getItem("savedtext"));

    if (savedItems != null) {
      for (i=0; i < 9; i++) {
        var textInput = containerDiv
        .children()
        .eq(i)
        .children(".description");

        textInput.text(savedItems[i]);
      }
    } else {
      console.log("No data found.");
    }
  }

  savedInfo();

  // TODO: Add code to display the current date in the header of the page.
setInterval(hourCheck, 1000);
  var currentDate= dayjs().format("dddd,MMMM D, YYYY");
  $("currentDay").text(currentDate);
});
