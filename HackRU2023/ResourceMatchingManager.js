class ResourceMatchingManager {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    setCategory(email, category) {
        const currentUser = this.userRepository.findByEmail(email); // retrieve user from user database
        currentUser.setCategory(category);
    }
}