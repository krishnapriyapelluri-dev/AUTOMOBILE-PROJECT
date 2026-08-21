import java.util.*;

public class AStarAlgorithm {

    // Node class representing each cell in the grid
    public static class Node implements Comparable<Node> {
        public int x, y;
        public boolean isObstacle;
        public double g; // Cost from start node to this node
        public double h; // Estimated cost from this node to target (heuristic)
        public double f; // Total cost (f = g + h)
        public Node parent;

        public Node(int x, int y, boolean isObstacle) {
            this.x = x;
            this.y = y;
            this.isObstacle = isObstacle;
            this.g = Double.POSITIVE_INFINITY;
            this.h = 0;
            this.f = Double.POSITIVE_INFINITY;
            this.parent = null;
        }

        @Override
        public int compareTo(Node other) {
            return Double.compare(this.f, other.f);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Node node = (Node) o;
            return x == node.x && y == node.y;
        }

        @Override
        public int hashCode() {
            return Objects.hash(x, y);
        }
    }

    /**
     * Finds the shortest path from start to target using the A* algorithm.
     *
     * @param grid   2D array representing the grid map
     * @param start  Starting node
     * @param target Target node
     * @return List of nodes representing the path from start to target, or empty list if no path exists
     */
    public static List<Node> findPath(Node[][] grid, Node start, Node target) {
        int rows = grid.length;
        int cols = grid[0].length;

        // Open list ordered by lowest f score
        PriorityQueue<Node> openSet = new PriorityQueue<>();
        Set<Node> closedSet = new HashSet<>();

        // Initialize start node
        start.g = 0;
        start.h = calculateHeuristic(start, target);
        start.f = start.g + start.h;
        openSet.add(start);

        // Direction vectors for 4-directional movement (Up, Down, Left, Right)
        int[][] directions = {
            {-1, 0}, // Up
            {1, 0},  // Down
            {0, -1}, // Left
            {0, 1}   // Right
        };

        while (!openSet.isEmpty()) {
            Node current = openSet.poll();

            // Check if target is reached
            if (current.equals(target)) {
                return reconstructPath(current);
            }

            closedSet.add(current);

            // Explore neighbors
            for (int[] dir : directions) {
                int neighborX = current.x + dir[0];
                int neighborY = current.y + dir[1];

                // Check grid bounds
                if (neighborX >= 0 && neighborX < rows && neighborY >= 0 && neighborY < cols) {
                    Node neighbor = grid[neighborX][neighborY];

                    // Skip obstacles and already evaluated nodes
                    if (neighbor.isObstacle || closedSet.contains(neighbor)) {
                        continue;
                    }

                    double tentativeG = current.g + 1; // Movement cost between adjacent cells = 1

                    if (tentativeG < neighbor.g) {
                        neighbor.parent = current;
                        neighbor.g = tentativeG;
                        neighbor.h = calculateHeuristic(neighbor, target);
                        neighbor.f = neighbor.g + neighbor.h;

                        if (!openSet.contains(neighbor)) {
                            openSet.add(neighbor);
                        } else {
                            // Re-evaluate priority in queue by re-inserting
                            openSet.remove(neighbor);
                            openSet.add(neighbor);
                        }
                    }
                }
            }
        }

        return Collections.emptyList(); // No path found
    }

    /**
     * Calculates Manhattan Distance heuristic between two nodes.
     */
    private static double calculateHeuristic(Node node, Node target) {
        return Math.abs(node.x - target.x) + Math.abs(node.y - target.y);
    }

    /**
     * Reconstructs path by traversing parent pointers backward from target.
     */
    private static List<Node> reconstructPath(Node current) {
        List<Node> path = new ArrayList<>();
        Node curr = current;
        while (curr != null) {
            path.add(curr);
            curr = curr.parent;
        }
        Collections.reverse(path);
        return path;
    }

    /**
     * Visualizes the grid map and path in the console.
     */
    public static void printGrid(Node[][] grid, List<Node> path, Node start, Node target) {
        Set<Node> pathSet = new HashSet<>(path);
        int rows = grid.length;
        int cols = grid[0].length;

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                Node node = grid[i][j];
                if (node.equals(start)) {
                    System.out.print(" S ");
                } else if (node.equals(target)) {
                    System.out.print(" E ");
                } else if (pathSet.contains(node)) {
                    System.out.print(" * ");
                } else if (node.isObstacle) {
                    System.out.print(" # ");
                } else {
                    System.out.print(" . ");
                }
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        int rows = 7;
        int cols = 9;
        Node[][] grid = new Node[rows][cols];

        // Initialize grid nodes
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                grid[r][c] = new Node(r, c, false);
            }
        }

        // Set obstacles '#'
        int[][] obstacleCoords = {
            {1, 2}, {2, 2}, {3, 2}, {4, 2},
            {2, 5}, {3, 5}, {4, 5}, {5, 5}
        };
        for (int[] coord : obstacleCoords) {
            grid[coord[0]][coord[1]].isObstacle = true;
        }

        Node start = grid[0][0];
        Node target = grid[6][8];

        System.out.println("=== Initial Grid ===");
        printGrid(grid, Collections.emptyList(), start, target);

        List<Node> path = findPath(grid, start, target);

        System.out.println("\n=== Grid with A* Path ('*') ===");
        if (!path.isEmpty()) {
            printGrid(grid, path, start, target);
            System.out.println("\nPath Cost (steps): " + (path.size() - 1));
            System.out.print("Path coordinates: ");
            for (int i = 0; i < path.size(); i++) {
                Node n = path.get(i);
                System.out.print("(" + n.x + "," + n.y + ")" + (i < path.size() - 1 ? " -> " : ""));
            }
            System.out.println();
        } else {
            System.out.println("No path could be found from start to target.");
        }
    }
}
