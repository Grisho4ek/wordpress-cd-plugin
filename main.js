window.addEventListener('load', () => {
  const btn = document.querySelector('.BuildFrontEnd__btn');
  const loadingElement = document.querySelector('.BuildFrontEnd__loading');
  const errorNotification = document.querySelector('.BuildFrontEnd__error');
  const statusElement = document.querySelector('.BuildFrontEnd__status');
  const dateElement = document.querySelector('.BuildFrontEnd__date');

  function triggerBuild() {
    btn.disabled = 'true';

    fetch(
      `https://api.github.com/repos/${window.user}/${window.repo}/dispatches`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${window.token}`
        },
        body: JSON.stringify({
          event_type: 'build-via-wordpress'
        })
      }
    )
      .then(() => {
        errorNotification.classList.remove('BuildFrontEnd__error--shown');
        startBuildTimeStamp = Date.now();
        getWorkflow();
      })
      .catch(() => {
        errorNotification.classList.add('BuildFrontEnd__error--shown');
        status.classList.add('BuildFrontEnd__status--pending');
        btn.disabled = undefined;
      });
  }

  function repeatGetWorkflow() {
    const timeout = setTimeout(() => {
      getWorkflow();
      clearTimeout(timeout);
    }, 30 * 1000);
  }

  async function getWorkflow() {
    loadingElement.classList.add('BuildFrontEnd__loading--shown');
    btn.disabled = 'true';
    fetch(
      `https://api.github.com/repos/${window.user}/${window.repo}/actions/runs`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${window.token}`
        }
      }
    )
      .then(async (res) => {
        loadingElement.className = 'BuildFrontEnd__loading';

        const json = await res.json();
        const workflows = json.workflow_runs;
        const currentWorkflow = workflows[0];
        const createdAt = Date.parse(currentWorkflow.created_at);
        const conclusion = currentWorkflow.conclusion;

        if (!conclusion) {
          btn.disabled = 'true';
          repeatGetWorkflow();
          currentWorkflow.status === 'in_progress' &&
            setStatus(currentWorkflow.status);
        } else {
          btn.disabled = undefined;
          setStatus(conclusion);
          let o = new Intl.DateTimeFormat('uk', {
            dateStyle: 'short',
            timeStyle: 'short'
          });
          const forattedDate = o.format(createdAt);
          dateElement.textContent = `Last build: ${forattedDate}`;
        }
      })
      .catch(() => {
        errorNotification.classList.add('BuildFrontEnd__error--shown');
      });
  }

  function setStatus(status) {
    statusElement.className = `BuildFrontEnd__status BuildFrontEnd__status--${status}`;
  }

  getWorkflow();
  btn.addEventListener('click', triggerBuild);
});
