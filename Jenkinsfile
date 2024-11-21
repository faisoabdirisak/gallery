pipeline{
    agent any
    tools{
        nodejs "nodejs"
    }

    stages{
        stage('Clone Repository'){
            steps{
                git branch:'master', url:'https://github.com/faisoabdirisak/gallery.git'
            }
        }
        stage ('Project Build') {
            steps {
                sh 'npm install'
            }
        }
        stage ('Running Tests') {
            steps {
                sh 'npm test'  
            }
       }

       }
            
    }
}