function expanded($el) {
  $el.classList.add("is-active");
}

function collapsed($el) {
  $el.classList.remove("is-active");
}

(document.querySelectorAll(".menu-block a.menu-label") || []).forEach(
  ($trigger) => {
    var expand_more = document.createElement('span');
    expand_more.className = "material-symbols-outlined";
    expand_more.innerHTML='expand_more';
    var chevron_right = document.createElement('span');
    chevron_right.className = "material-symbols-outlined";
    chevron_right.innerHTML='chevron_right';

    const $target = $trigger.nextElementSibling;
    $trigger.addEventListener("click", () => {
        let $icon = $trigger.childNodes[1];
        if($target.classList.contains('is-active')){
            while ($icon.firstChild) {
                $icon.removeChild($icon.firstChild);
            }
            $icon.appendChild(chevron_right);
            // $trigger.childNodes[2].innetHtml = 'chevron_right';
            collapsed($trigger);
            collapsed($target);
        }else{
            while ($icon.firstChild) {
                $icon.removeChild($icon.firstChild);
            }
            $icon.appendChild(expand_more);
            // $trigger.childNodes[2].innetHtml = 'expand_more';
            expanded($trigger);
            expanded($target);
        }
    });
  }
);
