/*  Wizard */
jQuery(function ($) {
  'use strict';
  // Chose here which method to send the email, available:
  // Simple phpmail text/plain > form_send_multiple_branch.php (default)
  // PHPMailer text/html > phpmailer/multiple_branch_phpmailer.php
  // PHPMailer text/html SMTP > phpmailer/multiple_branch_phpmailer_smtp.php
  // PHPMailer with html template > phpmailer/multiple_branch_phpmailer_template.php
  // PHPMailer with html template SMTP> phpmailer/multiple_branch_phpmailer_template_smtp.php
  // $('form#wrapped').attr('action', 'form_send_multiple_branch.php');
  $('#wizard_container')
    .wizard({
      stepsWrapper: '#wrapped',
      submit: '.submit',
      beforeSelect: function (event, state) {
        if ($('input#website').val().length != 0) {
          return false;
        }
        if (!state.isMovingForward) return true;
        var inputs = $(this).wizard('state').step.find(':input');
        return !inputs.length || !!inputs.valid();
      },
    })
    .validate({
      errorPlacement: function (error, element) {
        if (element.is(':radio') || element.is(':checkbox')) {
          error.insertBefore(element.next());
        } else {
          error.insertAfter(element);
        }
      },
    });
});

$('#wizard_container').wizard({
  transitions: {
    branchtype: function ($step, action) {
      console.log(
        '👉 👉 👉  ~ file: wizard_func_multiple_branch.js:37 ~ step:',
        step
      );
      var branch = $step.find(':checked').val();
      if (!branch) {
        $('form').valid();
      }
      return branch;
    },
  },
});
