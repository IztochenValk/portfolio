pipeline {
  agent any

  options { timestamps() }

  environment {
    GITHUB_PAT = credentials('github-pat')
  }

  stages {
    stage('Checkout build-prod') {
      steps {
        git branch: 'build-prod',
            url: 'https://github.com/IztochenValk/portfolio.git',
            credentialsId: 'github-pat'
      }
    }

    stage('Deploy with Docker') {
      steps {
        dir('infra') {
          sh '''
            set -e
            docker compose pull || true
            docker compose up -d --force-recreate
          '''
        }
      }
    }
  }
}
