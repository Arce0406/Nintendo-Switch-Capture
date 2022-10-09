document.addEventListener("DOMContentLoaded", () => {
  function openTab($el) {
    $el.classList.add("is-active");
  }

  function closeTab($el) {
    $el.classList.remove("is-active");
  }

  function closeAllTabs() {
    (document.querySelectorAll(".tabs ul li") || []).forEach(($modal) => {
        closeTab($modal);
    });
    (document.querySelectorAll(".tab-panel") || []).forEach(($modal) => {
      closeTab($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".tabs ul li") || []).forEach(($trigger) => {
    const tab_id = $trigger.dataset.target;
    const $target = document.getElementById(tab_id);

    $trigger.addEventListener("click", () => {      
      closeAllTabs();
      openTab($trigger);
      openTab($target);
    });
  });

});
