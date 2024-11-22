pipeline {
    agent any

    triggers {
        pollSCM('H/1 * * * *') // Poll repository every 1 minutes
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch:'master', url:'https://github.com/faisoabdirisak/gallery.git'
            }
        }
        stage('Checkout Code') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
                failure {
                    mail to: 'faiso.abdirisak@student.moringaschool.com',
                        subject: 'Build Failed',
                        body: 'Tests failed for job. Check Jenkins for details.'
                }
            }
        }
        stage('Deploy to Heroku') {
            steps {
                withCredentials([usernameColonPassword(credentialsId: 'heroku', variable: 'HEROKU_CREDENTIALS')])
                {
                    sh 'git push https://${HEROKU_CREDENTIALS}@git.heroku.com/gallery-devops.git master'
                }
            }
            post {
                always {
                    slackSend color: 'good', message:  "Deployed ${BUILD_ID}", attachments: "Deployed Link 'https://gallery-devs-697f69a08750.herokuapp.com/"
                }
            }
        }
    }
}
