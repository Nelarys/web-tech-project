#!/bin/bash

check_homebrew() {
    if command -v brew >/dev/null 2>&1; then
        echo "Homebrew is already installed."
    else
        echo "Homebrew is not installed. Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
        
        echo "Homebrew installed successfully."
    fi
}

install_mysql() {
    echo "Installing MySQL..."
    brew install mysql
}

start_mysql() {
    echo "Starting MySQL service..."
    brew services start mysql
}

secure_mysql() {
    echo "Running MySQL secure installation..."
    mysql_secure_installation
}

main_macos() {
    check_homebrew
    
    if brew list mysql >/dev/null 2>&1; then
        echo "MySQL is already installed."
    else
        install_mysql
    fi
    
    start_mysql

    echo "MySQL has been installed and started successfully."
    echo "You can run 'mysql -u root' to log into the MySQL server."

    secure_mysql
}

main_macos