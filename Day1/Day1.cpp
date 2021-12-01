// Day1.cpp : This file contains the 'main' function. Program execution begins and ends there.
//
#include <fstream>
#include <vector>
#include <iostream>
#include <numeric>
using namespace std;
//Part A
void partA()
{
    vector<int> heap;
    int counter = 0;
    fstream f;
    f.open("input.txt");
    while (!f.eof()) {
        int num;
        f >> num;
        if(!heap.empty()  && num > heap[heap.size() - 1]) {
                counter++;
        }
        heap.push_back(num);
    }
    f.close();
    cout << counter << endl;
}

//Part B
void partB() {
	vector<int> heap;
	int counter = 0;
	int currentWindow = 0, windowSize = 3, prevSum = 0, sum = 0;
	fstream f;
	f.open("input.txt");
	while (!f.eof()) {
		int num, prevSum = 0;
		f >> num;
		heap.push_back(num);
	}
	for (int i = 0; i < heap.size() - 1; i++) {
		if (i + 3 <= heap.size() - 1) {
			sum = accumulate(heap.begin() + i, heap.begin() + i + 3, 0);
			if (sum > prevSum) {
				counter++;
			}
			prevSum = sum;
			sum = 0;
		}
	}
	cout << counter << endl;
}

void main() {
	partA();
	partB();
}