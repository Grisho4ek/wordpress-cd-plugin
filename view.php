<div class='BuildFrontEnd__container'>
  <button class='BuildFrontEnd__btn'>
    Trigger Build
  </button>
  <div class="BuildFrontEnd__loading">
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <div class='BuildFrontEnd__status'></div>
  <div class='BuildFrontEnd__date'></div>
  <div class="BuildFrontEnd__error">
    Something went wrong. Try again later
  </div>
</div>
<script>
  window.repo = "<?php echo $_ENV['GITHUB_REPO'] ?>";
  window.user = "<?php echo $_ENV['GITHUB_USER'] ?>";
  window.token = "<?php echo $_ENV['GITHUB_TOKEN'] ?>";
</script>