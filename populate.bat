python cli.py write-test-images
python cli.py create-item "Item 1" -d "This is the first item" -w 13.22 -i instance/test1.png
python cli.py create-image instance/test2.png
python cli.py create-image instance/test3.png
python cli.py create-item "Item 2" -d "This is the second item" -i 2
python cli.py create-item "Item 3" -d "This is the third item" -w 867.5309 -i 3
python cli.py create-item "Another item" -d "This item has the same image as Item 1" -w 0.42 -i 1
python cli.py create-item "To be deleted" -d "This item will be deleted" -i 2
python cli.py create-task 3 -m "This task is in progress"
python cli.py update-task 1 -p 0.3
python cli.py run-task -i 3 -m "This task is successful" -d 0.05 -u 0.02
python cli.py run-task -i 3 -m "This task has failed" -d 0.05 -u 0.02 -s 0.0
python cli.py run-task -i 5 -m "This task belongs to an item that will be deleted" -d 0.2
python cli.py delete-item 5
python cli.py run-task -i 4
python cli.py replace-image 2 instance/test3.png
python cli.py run-task -i 4
python cli.py update-item 2 -i instance/test2.png
python cli.py create-event "This is a test event"
python cli.py create-event "This is a test event with explicit info severity" -s info
python cli.py create-event "This is a test event with debug severity" -s debug
python cli.py create-event "Warning! This is still just a test" -s warning
python cli.py create-event "Oh no, an error. But it's a test" -s error
python cli.py create-event "This is another test event"
python cli.py create-event "This is yet another test event"
