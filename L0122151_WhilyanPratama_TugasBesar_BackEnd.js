const Graph = {
    "Goa Gong": {"Pantai Banyu Tibo": 12},
    "Museum SBY": {"Pantai Teleng Ria": 3.3, "Pantai Pancer": 2.4, "Pantai Watu Bale": 26, "Pantai Srau": 20, "Pantai Klayar": 29, "Pantai Banyu Tibo": 32},
    "Pantai Watu Karung": {"Pantai Banyu Tibo": 15, "Pantai Srau": 6.4, "Pantai Teleng Ria": 29.7, "Pantai Pancer": 28.8},
    "Pantai Banyu Tibo": {"Goa Gong": 12, "Pantai Klayar": 9.1, "Pantai Watu Karung": 15, "Museum SBY": 32},
    "Pantai Klayar": { "Pantai Banyu Tibo": 9.1, "Pantai Watu Karung": 12, "Museum SBY": 29},
    "Pantai Teleng Ria": {"Museum SBY": 3.3, "Pantai Pancer": 2.8, "Pantai Watu Bale": 28, "Pantai Watu Karung": 29.7},
    "Pantai Pancer": {"Museum SBY": 2.4, "Pantai Teleng Ria": 2.8, "Pantai Watu Bale": 27, "Pantai Watu Karung": 28.8},
    "Pantai Srau": {"Pantai Watu Karung": 6.4, "Museum SBY": 20},
    "Pantai Watu Bale": {"Museum SBY": 26, "Pantai Teleng Ria": 28, "Pantai Pancer": 27, "Pantai Soge": 1.9},
    "Pantai Soge": {"Pantai Watu Bale": 1.9}
}

function Dijkstra(Graph, Start, Target) {
    let Distances = {};
    let Visited = new Set();
    let Node = Object.keys(Graph);

    for (let node of Node) {
        Distances[node] = Infinity;
    }
    Distances[Start] = 0;

    while (Node.length) {
        Node.sort((a, b) => Distances[a] - Distances[b]);
        let ClosestNode = Node.shift();

        Visited.add(ClosestNode);

        for (let neighbor in Graph[ClosestNode]) {
            if (!Visited.has(neighbor)) {
                let newDistance = Distances[ClosestNode] + Graph[ClosestNode][neighbor];
                if (newDistance < Distances[neighbor]) {
                    Distances[neighbor] = newDistance;
                }
            }
        }
    }

    return Distances[Target];
}

function TotalJarak(Graph, Path) {
    let Total = 0;
    for (let i = 0; i < Path.length - 1; i++) {
        let Dist = Dijkstra(Graph, Path[i], Path[i + 1]);
        Total += Dist;
    }
    return Total;
}

function OptimalRute(Graph, Destinations) {
    let ShortestDistance = Infinity;
    let ShortestPath = [];

    function Permutasi(Array, Perm = []) {
        if (Array.length === 0) {
            let Distance = TotalJarak(Graph, Perm);
            if (Distance < ShortestDistance) {
                ShortestDistance = Distance;
                ShortestPath = Perm;
            }
        } else {
            for (let i = 0; i < Array.length; i++) {
                let Curr = Array.slice();
                let Next = Curr.splice(i, 1);
                Permutasi(Curr.slice(), Perm.concat(Next));
            }
        }
    }

    Permutasi(Destinations);
    return ShortestPath;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click', function() {
        let Destinations = [
            document.getElementById('destinasi1').value,
            document.getElementById('destinasi2').value,
            document.getElementById('destinasi3').value,
            document.getElementById('destinasi4').value
        ];

        let UniqDestinations = new Set(Destinations);
        if (UniqDestinations.size !== Destinations.length) {
            document.getElementById('Hasil').textContent = 'Harap pilih destinasi yang berbeda!';
            return;
        }

        let OptimalPath = OptimalRute(Graph, Destinations);
        let TotalDistance = TotalJarak(Graph, OptimalPath);

        document.getElementById('Hasil').textContent = 'Rute optimal: ' + OptimalPath.join(' --> ') + ' dengan total jarak ' + TotalDistance + ' km';
    });
});