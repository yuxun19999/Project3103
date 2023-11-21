pipeline {
	// agent {
    //     docker {
    //         image 'node:18.18.2'
    //         // args '-d -p 8443:3000 -u root -v /home/psp_jwoyoung/java:/opt/host-java -e JAVA_HOME=/opt/host-java/jdk-17'
    //     }
    // }

    agent any

    tools {
        nodejs "NodeJS"
    }

	stages {
        stage('Checkout SCM') {
			steps {
				git 'https://github.com/yuxun19999/JenkinsDependencyCheckTest.git'
			}
		}

		stage('Backend Tests') {
		    steps{
                dir('/Users/yuxun/Documents/GitHub/Project3103/backend-sit-forum-app-v1'){
                    sh 'npm install'
                    sh 'npm audit fix --force'
                    sh 'npm test'
                    junit 'backend-test-results.xml'
                }
			}
		}
        stage('Install Chrome for testing'){
            steps{
                sh 'echo $JAVA_HOME'
                sh 'echo "export PATH=/opt/host-java/jdk-17/bin:$PATH" >> ~/.bashrc'
                sh '. ~/.bashrc'
                sh '/opt/host-java/jdk-17/bin/java -version'
                sh 'wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -'
                sh 'sh -c "echo \'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main\' >> /etc/apt/sources.list.d/google-chrome.list"'
                sh 'apt-get update'
                sh 'apt-get install -y google-chrome-stable'

                // Download and install ChromeDriver (adjust version as needed)
                sh 'wget -N https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6045.105/linux64/chromedriver-linux64.zip'
                sh 'unzip chromedriver-linux64.zip'
                sh 'cp ./chromedriver-linux64/chromedriver /usr/bin/chromedriver'
                sh 'chmod +x /usr/bin/chromedriver'

                sh 'apt-get install xvfb -y'
                sh 'apt-get install dbus -y'
                sh 'service dbus start'
            }
        }
        stage('Frontend UI Testing'){
            parallel{
                stage('Start Frontend'){
                    steps{
                        sh 'cd ./frontend-sit-forum-app && npm install'
                        sh 'cd ./frontend-sit-forum-app && (npm start &)'
                        input message: 'Finished using the web site? (Click "Proceed" to continue)'
                    }
                }
                stage('Headless Browser Test') {
                    steps {
                        dir('frontend-sit-forum-app'){
                            sh 'sleep 120'
                            sh 'npm test'
                            junit 'frontend-test-results.xml'
                        }
                    }
                }
            }
        }
	stage('Uninstall Chrome'){
            steps{
		sh 'apt-get remove -y google-chrome-stable'
		sh 'apt-get remove -y xvfb'
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