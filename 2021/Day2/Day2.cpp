// Day2.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <vector>
#include <fstream>


using namespace std;

void partA() {
    fstream file;
    file.open("input.txt");
    vector<int> heap = {0, 0};
    while (!file.eof()) {
        string dir;
        int num;
        file >> dir;
        file >> num;
        if (dir == "forward") {
            heap[0] += num;
        }
        else if (dir == "up") {
            heap[1] -= num;
        }
        else {
            heap[1] += num;
        }
    }
    cout << heap[0] * heap[1] << endl;
}

void partB() {
    fstream file;
    file.open("input.txt");
    vector<int> heap = { 0, 0, 0 };
    while (!file.eof()) {
        string dir;
        int num;
        file >> dir;
        file >> num;
        if (dir == "forward") {
            heap[0] += num;
            heap[1] += heap[2] * num;
        }
        else if (dir == "up") {
            heap[2] -= num;
        }
        else {
            heap[2] += num;
        }
    }
    cout << heap[0] * heap[1] << endl;
}

int main()
{
    partA();
    partB();
}
