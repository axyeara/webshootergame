package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

func main() {

	fs := http.FileServer(http.Dir(".."))
	http.Handle("/", fs)
	http.HandleFunc("/asd/", viewHandler)
	log.Println("Listening...")
	http.ListenAndServe(":3000", nil)
}

func viewHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello asd")
}
