document.addEventListener("DOMContentLoaded", () => {
    const dels = document.querySelectorAll(".delete");

    dels.forEach(del => {
        del.addEventListener("click", (event) => {
            /*event.preventDefault(): Stops the default action that belongs to the event, which, in this case, is the form submission.
            Why It's Useful: It allows you to control when or if the form submission should occur based on user input, such as confirming the delete action.*/
            event.preventDefault();

            const confirmation = confirm("Are you sure you want to delete ?");
            if(confirmation) {
                //submit the form programmicaly
                del.closest('form').submit();
            }
        })
    })
})