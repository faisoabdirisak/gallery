pipeline {
    agent any

    triggers {
        pollSCM('H/1 * * * *') // Poll repository every 5 minutes
    }

    stages {
        stage('Clone Repository'){
            steps{
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


    }

      
}
