pipeline {
    agent any

    environment {
        NODEJS_HOME = '/opt/homebrew/bin/node'
        PATH = "$NODEJS_HOME/bin:$PATH"
    }

    stages {
        stage('Print Environment') {
            steps {
                echo "NODEJS_HOME: $NODEJS_HOME"
                echo "PATH: $PATH"
            }
        }

        stage('Backend Tests') {
            steps {
                dir('backend-sit-forum-app-v1') {
                    sh 'npm install'
                    sh 'npm audit fix --force'
                    sh 'npm test'
                    junit 'backend-test-results.xml'
                }
            }
        }

        stage('Install Chrome for testing') {
            steps {
                // Add your existing Chrome installation steps here
            }
        }

        stage('Frontend UI Testing') {
            steps {
                script {
                    echo 'No steps specified for this stage yet.'
                }
            }
        }

        stage('Uninstall Chrome') {
            steps {
                // Add your existing Chrome uninstallation steps here
            }
        }

        stage('OWASP Dependency-Check Vulnerabilities') {
            steps {
                dependencyCheck additionalArguments: '--propertyfile checker.properties --format HTML --format XML --log /owasplog', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'
            }
        }
    }

    post {
        success {
            dependencyCheckPublisher pattern: 'dependency-check-report.xml'
        }
    }
}
