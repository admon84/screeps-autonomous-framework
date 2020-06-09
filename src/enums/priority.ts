export enum Priority {
    Blocker   = 0, // CPU <= 6000
    Critical  = 1, // CPU > 6000
    Important = 2, // CPU > 8000
    Standard  = 3, // CPU > 9000
    Low       = 4, // CPU > 9500
    Trivial   = 5, // CPU > 9800
    Overflow  = 6  // CPU > 10100
}
