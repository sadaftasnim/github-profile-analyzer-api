CREATE DATABASE github_analyzer;

USE github_analyzer;

CREATE TABLE github_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    location VARCHAR(255),
    followers INT,
    following INT,
    public_repos INT,
    public_gists INT,
    account_age_years INT,
    profile_url VARCHAR(500),
    avatar_url VARCHAR(500),
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);