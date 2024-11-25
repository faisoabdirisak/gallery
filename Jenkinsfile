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
                     emailext attachLog: true, 
                        body:
                            """
                            <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
                            <p>
                            View console output at 
                            "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"
                            </p> 
                              <p><i>(Build log is attached.)</i></p>
                            """,
                        subject: "Status: FAILURE -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'", 
                        to: 'faisoabdirisak@gmail.com'
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
