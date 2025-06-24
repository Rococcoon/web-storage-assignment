package main

import (
	"log"
	"net/http"

	"Rococcoon/name-storage/handlers"
)

func main() {
	// create a new serve mux
	mux := http.NewServeMux()

	// Define paths
	const staticDir = "static"
	// Serve static files
	fs := http.FileServer(http.Dir(staticDir))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	mux.HandleFunc("/", handlers.HomeHandler)

	// Start the server
	port := "8080"
	log.Printf("Server starting on http://localhost:%s", port)
	err := http.ListenAndServe(":"+port, mux)
	if err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
